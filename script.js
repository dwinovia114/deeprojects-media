(() => {
  "use strict";
  const items = Array.isArray(window.MEDIA_ITEMS) ? window.MEDIA_ITEMS : [];
  const searchInput = document.getElementById("media-search");
  const grid = document.getElementById("media-grid");
  const count = document.getElementById("visible-count");
  const empty = document.getElementById("empty-state");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const categoryButtons = [...document.querySelectorAll("[data-category-pick]")];
  let activeFilter = "all";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));

  function card(item) {
    const isGame = String(item.type || "").toLowerCase().includes("game");
    const category = isGame ? "Educational Games" : "Language Learning";
    const cat = isGame ? "game" : "language";
    const tags = [
      item.subject ? `<span class="tag">${esc(item.subject)}</span>` : "",
      ...(item.grades || []).slice(0, 2).map(g => `<span class="tag">${esc(g)}</span>`),
      item.type ? `<span class="tag ${isGame ? "type-game" : "type-material"}">${esc(item.type)}</span>` : ""
    ].filter(Boolean).join("");
    const active = item.status !== "coming-soon" && Boolean(item.url);
    const href = active ? esc(item.url) : "#";
    const thumb = item.thumbnail ? `<img src="${esc(item.thumbnail)}" alt="Thumbnail ${esc(item.title)}" loading="lazy">` : "";
    const action = active ? `<a class="card-link" href="${href}">Jelajahi media <span>→</span></a>` : `<span class="card-link">Segera hadir</span>`;
    return `<article class="media-card" data-category="${cat}" data-search="${esc([item.title,item.description,item.subject,item.type,...(item.grades||[])].join(" "))}">
      <a class="media-image" href="${href}" ${active ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="Buka ${esc(item.title)}">
      ${thumb}<span class="image-badge">${category}</span><span class="image-arrow">↗</span></a>
      <div class="media-info"><div class="card-meta"><span class="status-dot"></span>${esc(item.subject || "Media pembelajaran")} · ${esc((item.grades||[]).join(", ") || "Semua kelas")}</div>
      <h3>${esc(item.title)}</h3><p>${esc(item.description || "")}</p>${action}</div></article>`;
  }
  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase("id");
    let visible = 0;
    grid.querySelectorAll(".media-card").forEach(cardEl => {
      const matches = (activeFilter === "all" || cardEl.dataset.category === activeFilter)
        && (!query || cardEl.dataset.search.toLocaleLowerCase("id").includes(query));
      cardEl.hidden = !matches;
      if (matches) visible++;
    });
    if (count) count.textContent = visible;
    if (empty) empty.hidden = visible > 0;
  }
  grid.innerHTML = items.filter(item => item && item.title).map(card).join("");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(b => b.classList.toggle("active", b === button));
    applyFilters();
  }));
  categoryButtons.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.categoryPick;
    filterButtons.forEach(b => b.classList.toggle("active", b.dataset.filter === activeFilter));
    applyFilters();
    document.getElementById("explore")?.scrollIntoView({behavior:"smooth"});
  }));
  searchInput?.addEventListener("input", applyFilters);
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), {threshold:0.08});
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));
  applyFilters();
})();

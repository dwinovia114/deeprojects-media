const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const searchInput = document.getElementById("media-search");
const cards = [...document.querySelectorAll(".media-card")];
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const categoryButtons = [...document.querySelectorAll("[data-category-pick]")];
const emptyState = document.getElementById("empty-state");
const visibleCount = document.getElementById("visible-count");
let activeFilter = "all";

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    mainNav.classList.toggle("open", open);
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
  }));
}

function applyFilters() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let count = 0;
  cards.forEach(card => {
    const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
    const text = `${card.dataset.search || ""} ${card.innerText}`.toLowerCase();
    const queryMatches = !query || text.includes(query);
    const show = categoryMatches && queryMatches;
    card.hidden = !show;
    if (show) count++;
  });
  if (emptyState) emptyState.hidden = count !== 0;
  if (visibleCount) visibleCount.textContent = count;
}

filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  applyFilters();
}));
categoryButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.categoryPick;
  filterButtons.forEach(item => item.classList.toggle("active", item.dataset.filter === activeFilter));
  applyFilters();
  document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
}));
searchInput?.addEventListener("input", applyFilters);
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
applyFilters();

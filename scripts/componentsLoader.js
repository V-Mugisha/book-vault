function loadComponent(componentId) {
  const targetElement = document.getElementById(componentId);
  if (!targetElement) {
    console.warn(`Element with id "${componentId}" not found`);
    return;
  }

  const componentPath = `components/${componentId}.html`;

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentPath}`);
      }
      return response.text();
    })
    .then((html) => {
      targetElement.innerHTML = html;

      // Initialize component-specific functionality
      if (componentId === "navigation") {
        initNavigation();
        setupThemeToggle()
      }
    })
    .catch((error) => {
      console.error("Error loading component:", error);
      targetElement.innerHTML = "<p>Error loading navigation</p>";
    });
}

// Theme toggle logic
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark")
  }
  // Update icon
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

function getStoredTheme() {
  return localStorage.getItem("bookVault_theme") || "light";
}

function setStoredTheme(theme) {
  localStorage.setItem("bookVault_theme", theme);
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = getStoredTheme();
    const next = current === "dark" ? "light" : "dark";
    setStoredTheme(next);
    applyTheme(next);
  });
  // Set initial icon
  applyTheme(getStoredTheme());
}

// Run theme setup after navigation loads
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getStoredTheme());
});

// Initialize navigation functionality
function initNavigation() {
  // Highlight active link based on current page
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("data-page");
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

// Load navigation component
loadComponent("navigation");

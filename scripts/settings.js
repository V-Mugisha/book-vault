// Storage functionality
const BOOKS_KEY = "bookVault_books";
const SETTINGS_KEY = "bookVault_settings";

const defaultSettings = {
  readingGoal: {
    year: new Date().getFullYear(),
    target: 24,
    current: 0,
  },
  theme: "light",
};

const storage = {
  getBooks: () => {
    const stored = localStorage.getItem(BOOKS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  },

  saveBooks: (books) => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  getSettings: () => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(stored);
  },

  saveSettings: (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  exportData: () => {
    const books = storage.getBooks();
    const settings = storage.getSettings();
    return JSON.stringify({ books, settings }, null, 2);
  },

  importData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.books) storage.saveBooks(data.books);
      if (data.settings) storage.saveSettings(data.settings);
      return true;
    } catch {
      return false;
    }
  },

  clearAll: () => {
    localStorage.removeItem(BOOKS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  },
};

// State
let settings = null;

// Elements
const loadingSpinner = document.getElementById("loadingSpinner");
const mainContent = document.getElementById("mainContent");
const alertMessage = document.getElementById("alertMessage");
const readingGoalInput = document.getElementById("readingGoal");
const currentYearSpan = document.getElementById("currentYear");
const saveGoalBtn = document.getElementById("saveGoalBtn");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const clearDataBtn = document.getElementById("clearDataBtn");
const totalBooksSpan = document.getElementById("totalBooks");

// Show message
const showMessage = (type, text) => {
  alertMessage.className = `alert alert-${type}`;
  alertMessage.textContent = text;
  alertMessage.style.display = "flex";

  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 5000);
};

// Initialize page
const initPage = () => {
  settings = storage.getSettings();

  // Calculate current reading progress
  settings.readingGoal.current = storage
    .getBooks()
    .filter((book) => book.status === "read").length;
  storage.saveSettings(settings);

  // Set values
  currentYearSpan.textContent = settings.readingGoal.year;
  readingGoalInput.value = settings.readingGoal.target;
  totalBooksSpan.textContent = storage.getBooks().length;

  // Hide spinner, show content
  loadingSpinner.style.display = "none";
  mainContent.style.display = "block";
};

// Save reading goal
saveGoalBtn.addEventListener("click", () => {
  const newTarget = parseInt(readingGoalInput.value) || 0;

  if (newTarget < 1 || newTarget > 1000) {
    showMessage("error", "Reading goal must be between 1 and 1000");
    return;
  }

  settings.readingGoal.target = newTarget;
  storage.saveSettings(settings);
  showMessage("success", "Reading goal updated successfully!");
});

// Export data
exportBtn.addEventListener("click", () => {
  try {
    const data = storage.exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `book-vault-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage("success", "Data exported successfully!");
  } catch (error) {
    showMessage("error", "Failed to export data");
  }
});

// Import data
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const jsonString = event.target.result;
      const success = storage.importData(jsonString);
      if (success) {
        showMessage(
          "success",
          "Data imported successfully! Refresh the page to see changes."
        );
        setTimeout(() => window.location.reload(), 2000);
      } else {
        showMessage("error", "Invalid data format");
      }
    } catch (error) {
      showMessage("error", "Failed to import data");
    }
  };
  reader.readAsText(file);

  // Reset file input
  e.target.value = "";
});

// Clear all data
clearDataBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to clear all data? This action cannot be undone."
    )
  ) {
    storage.clearAll();
    showMessage("success", "All data cleared. Refresh the page to reset.");
    setTimeout(() => window.location.reload(), 2000);
  }
});

// Initialize on load
initPage();

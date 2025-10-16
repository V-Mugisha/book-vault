// Storage functionality
const BOOKS_KEY = "bookVault_books";

const storage = {
  getBooks: () => {
    const stored = localStorage.getItem(BOOKS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  },

  saveBooks: (books) => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  addBook: (bookData) => {
    const books = storage.getBooks();
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split("T")[0],
    };
    books.push(newBook);
    storage.saveBooks(books);
    return newBook;
  },

  updateBook: (id, updates) => {
    const books = storage.getBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...updates };
    storage.saveBooks(books);
    return books[index];
  },
};

// Validators
const validators = {
  isbn: (value) => {
    const isbn10Pattern = /^(?:\d{9}[\dX])$/;
    const isbn13Pattern = /^(?:978|979)\d{10}$/;
    const cleanValue = value.replace(/[-\s]/g, "");

    if (isbn10Pattern.test(cleanValue) || isbn13Pattern.test(cleanValue)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error:
        "Invalid ISBN format. Use ISBN-10 (10 digits) or ISBN-13 (13 digits starting with 978 or 979)",
    };
  },

  date: (value) => {
    const datePattern = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    if (!datePattern.test(value)) {
      return {
        isValid: false,
        error: "Invalid date format. Use YYYY-MM-DD",
      };
    }

    const [, year, month, day] = value.match(datePattern);
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    if (
      date.getFullYear() !== parseInt(year) ||
      date.getMonth() !== parseInt(month) - 1 ||
      date.getDate() !== parseInt(day)
    ) {
      return {
        isValid: false,
        error: "Invalid date",
      };
    }

    return { isValid: true };
  },

  year: (value) => {
    if (value >= 1000 && value <= 2100) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: "Year must be between 1000 and 2100",
    };
  },

  required: (value) => {
    if (value && value.trim().length > 0) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: "This field is required",
    };
  },

  title: (value) => {
    const pattern = /^\S(?:.*\S)?$/;
    if (pattern.test(value) && value.length >= 2 && value.length <= 200) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: "Title must be 2-200 chars with no leading/trailing spaces",
    };
  },

  author: (value) => {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    if (pattern.test(value) && value.length >= 2 && value.length <= 100) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: "Author must be 2-100 chars with letters, spaces, or hyphens",
    };
  },

  genre: (value) => {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    if (pattern.test(value)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: "Genre must contain only letters, spaces, or hyphens",
    };
  },

  advanced: (value) => {
    const pattern = /\b(\w+)\s+\1\b/; // Detect duplicate words (advanced back-reference)
    if (!pattern.test(value)) {
      return { isValid: true };
    }
    return {
      isValid: false,
      error: 'Title contains duplicate words (e.g., "the the")',
    };
  },
};

// Get URL parameters
const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const editId = getUrlParam("id");
let isSubmitting = false;

// Elements
const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const yearInput = document.getElementById("publicationYear");
const genreInput = document.getElementById("genre");
const statusSelect = document.getElementById("status");
const ratingSelect = document.getElementById("rating");
const dateReadInput = document.getElementById("dateRead");
const notesTextarea = document.getElementById("notes");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");
const ratingGroup = document.getElementById("ratingGroup");
const dateReadGroup = document.getElementById("dateReadGroup");

// Initialize form
const initForm = () => {
  // Set current year as default
  yearInput.value = new Date().getFullYear();

  if (editId) {
    // Edit mode
    document.getElementById("pageTitle").textContent = "Edit Book";
    document.getElementById("pageDescription").textContent =
      "Update book information";
    submitBtn.textContent = "Update Book";

    const books = storage.getBooks();
    const book = books.find((b) => b.id === editId);

    if (book) {
      titleInput.value = book.title;
      authorInput.value = book.author;
      isbnInput.value = book.isbn;
      yearInput.value = book.publicationYear;
      genreInput.value = book.genre;
      statusSelect.value = book.status;
      ratingSelect.value = book.rating || "";
      dateReadInput.value = book.dateRead || "";
      notesTextarea.value = book.notes || "";

      // Show rating/date fields if status is 'read'
      if (book.status === "read") {
        ratingGroup.style.display = "block";
        dateReadGroup.style.display = "block";
      }
    } else {
      // Book not found, redirect to library
      window.location.href = "library.html";
    }
  }
};

// Toggle rating and date fields based on status
statusSelect.addEventListener("change", () => {
  if (statusSelect.value === "read") {
    ratingGroup.style.display = "block";
    dateReadGroup.style.display = "block";
  } else {
    ratingGroup.style.display = "none";
    dateReadGroup.style.display = "none";
    ratingSelect.value = "";
    dateReadInput.value = "";
  }
});

// Clear error when user types
const clearError = (fieldId) => {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  input.classList.remove("error");
  if (error) {
    error.style.display = "none";
    error.textContent = "";
  }
};

titleInput.addEventListener("input", () => clearError("title"));
authorInput.addEventListener("input", () => clearError("author"));
isbnInput.addEventListener("input", () => clearError("isbn"));
yearInput.addEventListener("input", () => clearError("publicationYear"));
genreInput.addEventListener("input", () => clearError("genre"));
dateReadInput.addEventListener("input", () => clearError("dateRead"));

// Show error
const showError = (fieldId, message) => {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  input.classList.add("error");
  if (error) {
    error.textContent = message;
    error.style.display = "block";
  }
};

// Validate form
const validateForm = () => {
  let isValid = true;
  const errors = {};

  // Title validation
  const titleValidation = validators.title(titleInput.value);
  if (!titleValidation.isValid) {
    errors.title = titleValidation.error;
    isValid = false;
  } else {
    const advancedValidation = validators.advanced(titleInput.value);
    if (!advancedValidation.isValid) {
      errors.title = advancedValidation.error;
      isValid = false;
    }
  }

  // Author validation
  const authorValidation = validators.author(authorInput.value);
  if (!authorValidation.isValid) {
    errors.author = authorValidation.error;
    isValid = false;
  }

  // ISBN validation
  const isbnValidation = validators.isbn(isbnInput.value);
  if (!isbnValidation.isValid) {
    errors.isbn = isbnValidation.error;
    isValid = false;
  }

  // Year validation
  const yearValidation = validators.year(parseInt(yearInput.value));
  if (!yearValidation.isValid) {
    errors.publicationYear = yearValidation.error;
    isValid = false;
  }

  // Genre validation
  const genreValidation = validators.genre(genreInput.value);
  if (!genreValidation.isValid) {
    errors.genre = genreValidation.error;
    isValid = false;
  }

  // Date validation (only if status is read and date is provided)
  if (statusSelect.value === "read" && dateReadInput.value) {
    const dateValidation = validators.date(dateReadInput.value);
    if (!dateValidation.isValid) {
      errors.dateRead = dateValidation.error;
      isValid = false;
    }
  }

  // Show all errors
  Object.keys(errors).forEach((field) => {
    showError(field, errors[field]);
  });

  return isValid;
};

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  // Hide previous messages
  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  if (!validateForm()) {
    return;
  }

  isSubmitting = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const formData = {
      title: titleInput.value,
      author: authorInput.value,
      isbn: isbnInput.value,
      publicationYear: parseInt(yearInput.value),
      genre: genreInput.value,
      status: statusSelect.value,
      rating: ratingSelect.value ? parseInt(ratingSelect.value) : undefined,
      notes: notesTextarea.value,
      dateRead: dateReadInput.value || undefined,
    };

    if (editId) {
      storage.updateBook(editId, formData);
      successMessage.textContent = "Book updated successfully!";
    } else {
      storage.addBook(formData);
      successMessage.textContent = "Book added successfully!";
    }

    successMessage.style.display = "flex";

    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "library.html";
    }, 1500);
  } catch (error) {
    errorMessage.textContent = "An error occurred. Please try again.";
    errorMessage.style.display = "flex";
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = editId ? "Update Book" : "Add Book";
  }
});

// Handle cancel button
cancelBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to cancel? Any unsaved changes will be lost."
    )
  ) {
    window.location.href = "library.html";
  }
});

// Initialize
initForm();

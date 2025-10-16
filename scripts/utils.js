window.validators = {
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
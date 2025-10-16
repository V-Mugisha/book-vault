// Storage functionality
const BOOKS_KEY = "bookVault_books";
const seedBooks = [
  {
    id: "1",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    isbn: "978-0553103540",
    publicationYear: 1996,
    genre: "Fantasy",
    status: "read",
    rating: 5,
    notes:
      "Epic fantasy series starter. Complex characters and intricate plot.",
    dateAdded: "2024-01-15",
    dateRead: "2024-02-20",
    pages: 694,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    publicationYear: 1960,
    genre: "Fiction",
    status: "read",
    rating: 5,
    notes: "Powerful story about justice and morality in the American South.",
    dateAdded: "2024-01-10",
    dateRead: "2024-01-25",
    pages: 324,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publicationYear: 1949,
    genre: "Dystopian",
    status: "read",
    rating: 5,
    notes: "Chilling vision of totalitarian future. Still relevant today.",
    dateAdded: "2024-02-01",
    dateRead: "2024-02-15",
    pages: 298,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    publicationYear: 1813,
    genre: "Romance",
    status: "read",
    rating: 4,
    notes: "Classic romance with witty social commentary.",
    dateAdded: "2024-02-10",
    dateRead: "2024-03-05",
    pages: 432,
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publicationYear: 1925,
    genre: "Fiction",
    status: "read",
    rating: 4,
    notes: "Beautiful prose depicting the Jazz Age and American Dream.",
    dateAdded: "2024-03-01",
    dateRead: "2024-03-20",
    pages: 218,
  },
  {
    id: "6",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    publicationYear: 1937,
    genre: "Fantasy",
    status: "reading",
    notes: "Currently on chapter 8. Loving the adventure!",
    dateAdded: "2024-03-15",
    pages: 310,
  },
  {
    id: "7",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0439708180",
    publicationYear: 1997,
    genre: "Fantasy",
    status: "read",
    rating: 5,
    notes: "Magical introduction to the wizarding world.",
    dateAdded: "2024-01-05",
    dateRead: "2024-01-18",
    pages: 309,
  },
  {
    id: "8",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0316769174",
    publicationYear: 1951,
    genre: "Fiction",
    status: "read",
    rating: 3,
    notes: "Interesting perspective on teenage angst and alienation.",
    dateAdded: "2024-02-20",
    dateRead: "2024-03-10",
    pages: 277,
  },
  {
    id: "9",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "978-0544003415",
    publicationYear: 1954,
    genre: "Fantasy",
    status: "to-read",
    notes: "Planning to read after finishing The Hobbit.",
    dateAdded: "2024-03-20",
    pages: 1178,
  },
  {
    id: "10",
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0060850524",
    publicationYear: 1932,
    genre: "Dystopian",
    status: "to-read",
    dateAdded: "2024-03-22",
    pages: 288,
  },
  {
    id: "11",
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    isbn: "978-0066238500",
    publicationYear: 1950,
    genre: "Fantasy",
    status: "read",
    rating: 4,
    notes: "Wonderful allegorical fantasy series.",
    dateAdded: "2024-01-20",
    dateRead: "2024-02-28",
    pages: 767,
  },
  {
    id: "12",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    publicationYear: 1965,
    genre: "Science Fiction",
    status: "reading",
    notes: "Complex world-building. Taking my time with this one.",
    dateAdded: "2024-03-10",
    pages: 658,
  },
  {
    id: "13",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    isbn: "978-0345391803",
    publicationYear: 1979,
    genre: "Science Fiction",
    status: "read",
    rating: 5,
    notes: "Hilarious and clever sci-fi comedy. Don't forget your towel!",
    dateAdded: "2024-02-05",
    dateRead: "2024-02-18",
    pages: 224,
  },
  {
    id: "14",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "978-1451673319",
    publicationYear: 1953,
    genre: "Dystopian",
    status: "to-read",
    dateAdded: "2024-03-25",
    pages: 194,
  },
  {
    id: "15",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0062315007",
    publicationYear: 1988,
    genre: "Fiction",
    status: "read",
    rating: 4,
    notes: "Inspiring tale about following your dreams.",
    dateAdded: "2024-01-30",
    dateRead: "2024-02-12",
    pages: 208,
  },
  {
    id: "16",
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "978-0375842207",
    publicationYear: 2005,
    genre: "Historical Fiction",
    status: "to-read",
    dateAdded: "2024-03-28",
    pages: 552,
  },
];

const storage = {
  getBooks: () => {
    const stored = localStorage.getItem(BOOKS_KEY);
    if (!stored) {
      localStorage.setItem(BOOKS_KEY, JSON.stringify(seedBooks));
      return seedBooks;
    }
    return JSON.parse(stored);
  },
  saveBooks: (books) => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },
  deleteBook: (id) => {
    const books = storage.getBooks();
    const filtered = books.filter((b) => b.id !== id);
    if (filtered.length === books.length) return false;
    storage.saveBooks(filtered);
    return true;
  },
};

// Validator
const isValidRegex = (pattern) => {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
};

// State
let books = [];
let filteredBooks = [];
let searchQuery = "";
let statusFilter = "all";
let genreFilter = "all";
let sortBy = "dateAdded";
let isRegexSearch = false;
let sortDirection = { title: "asc", pages: "asc" };

// Render star rating
const renderStars = (rating) => {
  if (!rating) return "—";
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      `<svg class="star-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    );
  }
  return `<div class="star-rating">${stars.join("")}</div>`;
};

// Get status label
const getStatusLabel = (status) => {
  if (status === "to-read") return "To Read";
  if (status === "reading") return "Reading";
  return "Read";
};

// Render books table
const renderBooksTable = () => {
  const tbody = document.getElementById("booksTableBody");
  tbody.innerHTML = "";
  filteredBooks.forEach((book) => {
    const tr = document.createElement("tr");

    const notesPreview = book.notes
      ? `<div class="table-notes">${book.notes.substring(0, 60)}${
          book.notes.length > 60 ? "..." : ""
        }</div>`
      : "";
    tr.innerHTML = `
      <td>
        <strong>${book.title}</strong>
        ${notesPreview}
      </td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.publicationYear}</td>
      <td>
        <span class="book-status ${book.status}">
          ${getStatusLabel(book.status)}
        </span>
      </td>
       <td>${book.pages}</td>
      <td>${renderStars(book.rating)}</td>
      <td>
        <div class="table-actions">
          <a href="form.html?id=${book.id}" class="btn-icon" aria-label="Edit ${
      book.title
    }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </a>
          <button 
            class="btn-icon btn-icon-danger" 
            aria-label="Delete ${book.title}"
            onclick="handleDelete('${book.id}')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("sortTitleIndicator").textContent =
    sortDirection.title === "asc" ? "↑" : "↓";
  document.getElementById("sortPagesIndicator").textContent =
    sortDirection.pages === "asc" ? "↑" : "↓";
};

// Render books cards
const renderBooksCards = () => {
  const grid = document.getElementById("booksCardsGrid");
  grid.innerHTML = "";
  filteredBooks.forEach((book) => {
    const article = document.createElement("article");
    article.className = "book-card";
    const notesPreview = book.notes
      ? `<p style="font-size: 0.875rem; color: var(--color-text-light); margin-bottom: var(--spacing-sm);">
          ${book.notes.substring(0, 100)}${book.notes.length > 100 ? "..." : ""}
        </p>`
      : "";
    const ratingDisplay = book.rating
      ? `<span style="display: flex; align-items: center; gap: 4px;">Rating: ${renderStars(
          book.rating
        )}</span>`
      : "";
    article.innerHTML = `
      <div class="book-cover" style="background: linear-gradient(135deg, var(--color-primary), var(--color-accent));">
        📖
      </div>
      <span class="book-status ${book.status}">
        ${getStatusLabel(book.status)}
      </span>
      <h3 class="book-title">${book.title}</h3>
      <p class="book-author">by ${book.author}</p>
      <div class="book-meta">
        <span>Genre: ${book.genre}</span>
        <span>Year: ${book.publicationYear}</span>
        <span>Pages: ${book.pages}</span>
        <span>ISBN: ${book.isbn}</span>
        ${ratingDisplay}
      </div>
      ${notesPreview}
      <div class="book-actions">
        <a href="form.html?id=${book.id}" class="btn btn-secondary btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </a>
        <button 
          class="btn btn-error btn-sm" 
          aria-label="Delete ${book.title}"
          onclick="handleDelete('${book.id}')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    `;
    grid.appendChild(article);
  });

  document.getElementById("sortTitleIndicator").textContent =
    sortDirection.title === "asc" ? "↑" : "↓";
  document.getElementById("sortPagesIndicator").textContent =
    sortDirection.pages === "asc" ? "↑" : "↓";
};

// Update display
const updateDisplay = () => {
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const emptyStateDescription = document.getElementById(
    "emptyStateDescription"
  );

  resultsCount.textContent = `Showing ${filteredBooks.length} of ${books.length} books`;

  if (filteredBooks.length === 0) {
    emptyState.style.display = "block";
    if (books.length === 0) {
      emptyStateDescription.textContent =
        "Your library is empty. Add your first book to get started!";
    } else {
      emptyStateDescription.textContent =
        "Try adjusting your filters or search query.";
    }
  } else {
    emptyState.style.display = "none";
    renderBooksTable();
    renderBooksCards();
  }
};

// Filter and sort books
const filterAndSortBooks = () => {
  let result = [...books];
  const searchErrorEl = document.getElementById("searchError");

  // Status filter
  if (statusFilter !== "all") {
    result = result.filter((book) => book.status === statusFilter);
  }

  // Genre filter
  if (genreFilter !== "all") {
    result = result.filter((book) => book.genre === genreFilter);
  }

  // Search filter
  if (searchQuery) {
    if (isRegexSearch) {
      if (isValidRegex(searchQuery)) {
        try {
          const regex = new RegExp(searchQuery, "i");
          result = result.filter(
            (book) =>
              regex.test(book.title) ||
              regex.test(book.author) ||
              regex.test(book.genre)
          );
          searchErrorEl.style.display = "none";
        } catch {
          searchErrorEl.textContent = "Invalid regex pattern";
          searchErrorEl.style.display = "block";
        }
      } else {
        searchErrorEl.textContent = "Invalid regex pattern";
        searchErrorEl.style.display = "block";
      }
    } else {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      );
      searchErrorEl.style.display = "none";
    }
  } else {
    searchErrorEl.style.display = "none";
  }

  // Sort
  result.sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "pages":
        const pagesA = a.pages || 0;
        const pagesB = b.pages || 0;
        return sortDirection.pages === "asc"
          ? pagesA - pagesB
          : pagesB - pagesA;
      case "author":
        return a.author.localeCompare(b.author);
      case "year":
        return b.publicationYear - a.publicationYear;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "dateAdded":
      default:
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
    }
  });
  filteredBooks = result;
  updateDisplay();
};

// Update genre filter options
const updateGenreFilter = () => {
  const genreFilterEl = document.getElementById("genreFilter");
  const genres = Array.from(new Set(books.map((b) => b.genre))).sort();

  genreFilterEl.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilterEl.appendChild(option);
  });
};

// Handle delete
window.handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this book?")) {
    storage.deleteBook(id);
    books = storage.getBooks();
    updateGenreFilter();
    filterAndSortBooks();
    document.getElementById(
      "totalBooksText"
    ).textContent = `Browse and manage your book collection (${books.length} books total)`;
  }
};

// Event listeners
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  filterAndSortBooks();
});

document.getElementById("regexSearch").addEventListener("change", (e) => {
  isRegexSearch = e.target.checked;
  const searchInput = document.getElementById("searchInput");
  searchInput.placeholder = isRegexSearch
    ? "Enter regex pattern (e.g., ^A.*Game)"
    : "Search by title, author, or genre...";
  filterAndSortBooks();
});

document.getElementById("statusFilter").addEventListener("change", (e) => {
  statusFilter = e.target.value;
  filterAndSortBooks();
});

document.getElementById("genreFilter").addEventListener("change", (e) => {
  genreFilter = e.target.value;
  filterAndSortBooks();
});

document.getElementById("sortBy").addEventListener("change", (e) => {
  sortBy = e.target.value;
  if (sortBy === "title")
    sortDirection.title = sortDirection.title === "asc" ? "desc" : "asc";
  if (sortBy === "pages")
    sortDirection.pages = sortDirection.pages === "asc" ? "desc" : "asc";
  filterAndSortBooks();
});

// Initialize
books = storage.getBooks();
filteredBooks = [...books];
document.getElementById(
  "totalBooksText"
).textContent = `Browse and manage your book collection (${books.length} books total)`;

updateGenreFilter();
updateDisplay();

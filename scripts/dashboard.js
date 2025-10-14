// Storage functionality
    const BOOKS_KEY = 'bookVault_books';
    const SETTINGS_KEY = 'bookVault_settings';

    const defaultSettings = {
      readingGoal: {
        year: new Date().getFullYear(),
        target: 24,
        current: 0
      },
      theme: 'light'
    };

    const storage = {
      getBooks: () => {
        const stored = localStorage.getItem(BOOKS_KEY);
        if (!stored) return [];
        return JSON.parse(stored);
      },

      getSettings: () => {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (!stored) {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
          return defaultSettings;
        }
        return JSON.parse(stored);
      }
    };

    // Initialize page
    const initDashboard = () => {
      const books = storage.getBooks();
      const settings = storage.getSettings();

      // Calculate statistics
      const totalBooks = books.length;
      const readBooks = books.filter(b => b.status === 'read').length;
      const readingBooks = books.filter(b => b.status === 'reading').length;
      const toReadBooks = books.filter(b => b.status === 'to-read').length;

      const booksReadThisYear = books.filter(b => 
        b.dateRead && new Date(b.dateRead).getFullYear() === settings.readingGoal.year
      ).length;

      const goalProgress = settings.readingGoal.target > 0 
        ? Math.round((booksReadThisYear / settings.readingGoal.target) * 100) 
        : 0;

      const ratedBooks = books.filter(b => b.rating);
      const averageRating = ratedBooks.length > 0
        ? (books.reduce((sum, b) => sum + (b.rating || 0), 0) / ratedBooks.length).toFixed(1)
        : 'N/A';

      // Genre breakdown
      const genreBreakdown = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
      }, {});

      const topGenres = Object.entries(genreBreakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      const recentlyRead = books
        .filter(b => b.status === 'read' && b.dateRead)
        .sort((a, b) => new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime())
        .slice(0, 5);

      // Update progress bar
      document.getElementById('goalYearTitle').textContent = `${settings.readingGoal.year} Reading Goal`;
      document.getElementById('goalText').textContent = `${booksReadThisYear} / ${settings.readingGoal.target} books`;
      const progressFill = document.getElementById('progressFill');
      const progressWidth = Math.min(goalProgress, 100);
      progressFill.style.width = `${progressWidth}%`;
      progressFill.textContent = `${goalProgress}%`;

      // Show goal complete message
      if (goalProgress >= 100) {
        const goalCompleteAlert = document.getElementById('goalCompleteAlert');
        document.getElementById('goalCompleteText').textContent = 
          `Congratulations! You've reached your reading goal for ${settings.readingGoal.year}!`;
        goalCompleteAlert.style.display = 'flex';
      }

      // Update stats
      document.getElementById('totalBooks').textContent = totalBooks;
      document.getElementById('readBooks').textContent = readBooks;
      document.getElementById('readingBooks').textContent = readingBooks;
      document.getElementById('toReadBooks').textContent = toReadBooks;
      document.getElementById('averageRating').textContent = averageRating;
      document.getElementById('totalGenres').textContent = Object.keys(genreBreakdown).length;

      // Update top genres
      const topGenresContent = document.getElementById('topGenresContent');
      if (topGenres.length > 0) {
        topGenresContent.innerHTML = topGenres.map(([genre, count]) => `
          <div class="genre-item">
            <div class="genre-header">
              <span>${genre}</span>
              <span style="color: var(--color-text-light);">${count} books</span>
            </div>
            <div class="genre-bar">
              <div class="genre-bar-fill" style="width: ${(count / totalBooks) * 100}%;"></div>
            </div>
          </div>
        `).join('');
      } else {
        topGenresContent.innerHTML = '<p style="color: var(--color-text-light);">No genre data available</p>';
      }

      // Update recently read
      const recentlyReadContent = document.getElementById('recentlyReadContent');
      if (recentlyRead.length > 0) {
        recentlyReadContent.innerHTML = `
          <ul class="book-list">
            ${recentlyRead.map(book => `
              <li class="book-item">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-meta">
                  Finished: ${book.dateRead}${book.rating ? ` • ${'⭐'.repeat(book.rating)}` : ''}
                </div>
              </li>
            `).join('')}
          </ul>
        `;
      } else {
        recentlyReadContent.innerHTML = '<p style="color: var(--color-text-light);">No books read yet</p>';
      }

      // Update insights
      document.getElementById('mostReadGenre').textContent = topGenres.length > 0 ? topGenres[0][0] : 'N/A';
      document.getElementById('booksThisYear').textContent = booksReadThisYear;
      document.getElementById('completionRate').textContent = 
        totalBooks > 0 ? `${Math.round((readBooks / totalBooks) * 100)}%` : '0%';

      // Hide spinner, show content
      document.getElementById('loadingSpinner').style.display = 'none';
      document.getElementById('mainContent').style.display = 'block';
    };

    // Initialize on load
    initDashboard();
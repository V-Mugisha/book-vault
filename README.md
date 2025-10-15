# Book Vault

## Overview
Book Vault is a lightweight, browser-based application designed to help users manage their personal book library. It allows users to add, edit, and organize books, track reading progress, set annual reading goals, and export/import their data in JSON format. The app features a responsive design, accessible interface, and a library view with table and card layouts.

## Features
- **Library Management**: Add, edit, and view books with details like title, author, ISBN, genre, and status.
- **Reading Goals**: Set and track an annual reading goal with progress visualization.
- **Statistics Dashboard**: View total books, read/reading/to-read counts, average rating, and genre breakdown.
- **Data Management**: Export your library as a JSON file and import JSON data to restore or update your collection.
- **Responsive Design**: Switch between table and card views based on screen size (desktop: table, mobile: cards).
- **Accessibility**: Built with keyboard navigation and screen reader support in mind.

## Usage
1. **Open the App**: Load `index.html` in a modern web browser to access the about page.
2. **Navigate**: Use the navigation bar to switch between pages:
   - **Library**: Browse and filter your book collection.
   - **Dashboard**: View reading statistics.
   - **Form**: Add or edit a book.
   - **Settings**: Adjust your reading goal and manage data.
3. **Add a Book**:
   - Go to the "Form" page.
   - Fill in the required fields (title, author, ISBN, publication year, genre, status).
   - Optionally add a rating, date finished, and notes.
   - Click "Add Book" to save.
4. **Track Progress**:
   - Set a reading goal in "Settings" (e.g., 24 books for the year).
   - Check the "Dashboard" for progress updates.
5. **Manage Data**:
   - Export your library as a JSON file from "Settings".
   - Import a JSON file to overwrite your current library.

## Local Setup
To run Book Vault locally on your machine:
1. **Clone the Repository**:
   - If hosted on GitHub, clone it with:
     ```bash
     git clone https://github.com/V-Mugisha/book-vault.git
     ```
   - Otherwise, download the ZIP file and extract it.
2. **Navigate to the Directory**:
   - Open a terminal and change to the project folder:
     ```bash
     cd book-vault
     ```
3. **Open in Browser**:
   - Double-click `index.html` to open it in your default browser, or use a live server extension
   - Visit `http://localhost:5500` in your browser.
4. **No Dependencies**: The app requires no external dependencies beyond a modern browser.

## Contributing
We welcome contributions to enhance Book Vault! Here’s how you can get involved:

1. **Fork the Repository**:
   - On GitHub, click "Fork" to create your own copy.
2. **Clone Your Fork**:
   - Clone it to your local machine:
     ```bash
     git clone https://github.com/V-Mugisha/book-vault.git
     ```
3. **Create a Branch**:
   - Start a new branch for your feature or fix:
     ```bash
     git checkout -b feature-name
     ```
4. **Make Changes**:
   - Edit the HTML, CSS, or JavaScript files as needed.
   - Test your changes locally (see "Local Setup").
5. **Commit and Push**:
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Describe your changes"
     ```
   - Push to your fork:
     ```bash
     git push origin feature-name
     ```
6. **Submit a Pull Request**:
   - Go to the original repository on GitHub and create a pull request from your branch.
7. **Code Standards**:
   - Follow the existing structure (e.g., separate CSS files, consistent variable naming).
   - Ensure accessibility and responsiveness.

## License
This project is open-source. Feel free to use, modify, and distribute it.

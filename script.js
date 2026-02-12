// quick check in console to know the script loaded


// Step 1: Storage
const myLibrary = [];

// Step 2: Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(); // fallback
}

// Step 3: Add book
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Step 4: Display
function displayBooks() {
  const library = document.getElementById("library");
  library.innerHTML = ""; // clear

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.setAttribute("data-id", book.id);

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "✅ Read" : "❌ Not read"}</p>
      <div class="actions">
        <button class="btn remove-btn">Remove</button>
        <button class="btn toggle-btn">Toggle Read</button>
      </div>
    `;

    // attach actions
    bookCard.querySelector(".remove-btn").addEventListener("click", () => {
      removeBook(book.id);
    });

    bookCard.querySelector(".toggle-btn").addEventListener("click", () => {
      toggleReadStatus(book.id);
    });

    library.appendChild(bookCard);
  });
}

// Step 5: Remove
function removeBook(id) {
  const index = myLibrary.findIndex((b) => b.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Step 6: Toggle read
function toggleReadStatus(id) {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    book.read = !book.read;
    displayBooks();
  }
}

// Step 7: Form handling
const form = document.getElementById("bookForm");
if (!form) console.error("No #bookForm element found in HTML");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").checked;

  // simple validation
  if (!title || !author || !pages) {
    alert("Please fill title, author, pages.");
    return;
  }

  addBookToLibrary(title, author, pages, read);
  form.reset();

  // hide form again
  document.getElementById("bookFormContainer").classList.add("hidden");
});

// Step 8: Show/hide form button
const newBookBtn = document.getElementById("newBookBtn");
newBookBtn.addEventListener("click", () => {
  document.getElementById("bookFormContainer").classList.toggle("hidden");
});

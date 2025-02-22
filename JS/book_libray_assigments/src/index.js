let cart = [];
function dropdownFunction() {
  let dropdown = document.getElementById("myDropdown");
  let button = document.querySelector(".dropbtn");

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
  button.classList.toggle("active");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn") && !event.target.closest(".dropdown")) {
    document.getElementById("myDropdown").style.display = "none";
    document.querySelector(".dropbtn").classList.remove("active");
  }
};

// Function to display books
const displayBooks = (books) => {

  setTimeout(() => {
    if (books.length === 0) {
      document.getElementById("books").innerHTML = `<p>No books found!</p>`;
      return;
    } 
  }, 1000); // Display loading message after 1 second
  

  const booksHTML = books
    .sort((a, b) => a.pages - b.pages) // Sort by pages
    .map(
      (book) => `
      <div class="book_card" data-title="${book.title}">
        <img src="${book.image}" alt="Book Image" />
        <hr />
        <p><strong>${book.title}</strong> by <strong>${book.author}</strong> (${book.pages} pages)</p>
        <hr />
        <p><strong>Genre:</strong> ${book.genre} <strong>Publisher:</strong> ${book.publisher} <strong>Year:</strong> ${book.year}</p>
        <div class="buy_book">
          <button class="buy_book_button" data-id="${book.id}">Buy Now</button>
          <p><strong>Price:</strong> <span>ksh</span> ${book.price}</p>
        </div>
      </div>`
    )
    .join("");

  document.getElementById("books").innerHTML = booksHTML;
};

const filterBooks = (
  books,
  searchValue,
  filterName,
  filterYear,
  filterGenre
) => {
  let filteredBooks = books;

  if (searchValue) {
    filteredBooks = filteredBooks.filter((book) => {
      let matches = false;
      if (
        filterName.checked &&
        book.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        matches = true;
      }
      if (filterYear.checked && book.year.toString().includes(searchValue)) {
        matches = true;
      }
      if (
        filterGenre.checked &&
        book.genre.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        matches = true;
      }
      return matches;
    });
  }

  if (filterYear.checked) {
    filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
  }

  // Check if no books matched the criteria
  if (filteredBooks.length === 0) {
   document.getElementById("books").innerHTML = `<p>No books found!</p>`;
  }

  return filteredBooks;
};

// Function to update search placeholder based on selected filters
const updateSearchPlaceholder = (filterName, filterYear, filterGenre) => {
  const searchTerm = document.getElementById("search_name");
  let placeholderText = "Search...";

  if (filterName.checked && filterYear.checked && filterGenre.checked) {
    placeholderText = "Search by Name, Year, or Genre...";
  } else if (filterName.checked && filterYear.checked) {
    placeholderText = "Search by Name or Year...";
  } else if (filterName.checked && filterGenre.checked) {
    placeholderText = "Search by Name or Genre...";
  } else if (filterYear.checked && filterGenre.checked) {
    placeholderText = "Search by Year or Genre...";
  } else if (filterName.checked) {
    placeholderText = "Search by Name...";
  } else if (filterYear.checked) {
    placeholderText = "Search by Year...";
  } else if (filterGenre.checked) {
    placeholderText = "Search by Genre...";
  }

  searchTerm.placeholder = placeholderText;
};

// Function to show a modal with a message
const showModal = (message) => {
  document.body.classList.add("modal-open");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = message;
  modal.style.display = "flex";
};

// Function to close the modal
const closeModal = () => {
  document.body.classList.remove("modal-open");
  document.getElementById("modal").style.display = "none";
};

// Function to check if a book is a classic (published before 1900)
const checkClassicBook = (book) => {
  if (book.year <= 1900) {
    showModal(`This book is a classic! Published in ${book.year}.`);
  }
};

// Function to flag books with 500+ pages
const flagLargeBooks = (books, callback) => {
  setTimeout(() => {
    const flaggedBooks = books.map((book) => ({
      ...book,
      isLargeBook: book.pages >= 500,
    }));
    callback(flaggedBooks);
  }, 1000);
};

// Function to filter large books
const getLargeBooks = (books, callback) => {
  setTimeout(() => {
    const largeBooks = books.filter((book) => book.isLargeBook);
    callback(largeBooks);
  }, 3000);
};

// Function to generate cart HTML
const generateCartHTML = (cart) => {
  let cartHTML = `
    <h2>Your Cart</h2>
    <p><strong>Total Books:</strong> ${cart.reduce(
      (total, book) => total + book.quantity,
      0
    )}</p>
    <div class="modal-body">
  `;

  cartHTML += cart
    .map(
      (book) => `
        <div class="cart-item_continer">
          <div class="cart-item">
        
            <p class="cart-title"><strong>${book.title}</strong></p>
          
            <div class="list-cart-item">
              <img src="${book.image}" alt="${book.title}" class="cart-image" />
              <div class="cart-info">
                <p><strong>Price: Ksh</strong> ${book.price}</p>
                <p><strong>Quantity:</strong> ${book.quantity}</p>
                <p><strong>Subtotal:</strong> Ksh ${
                  book.price * book.quantity
                }</p>
              <div class="add-remove">
                  <button class="remove_book" data-id="${book.id}">-</button>
                  <span>${book.quantity}</span>
              <button class="add_book" data-id="${book.id}">+</button> 
              </div>
              </div>
              <div class="delete_div">
              <p>delete</p> 
              <button class="delete" data-id="${
                book.id
              }"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>`
    )
    .join("");

  cartHTML += `
    </div>
    <p><strong>Total Price:</strong> ksh ${cart.reduce(
      (sum, book) => sum + book.price * book.quantity,
      0
    )}</p>`;

  return cartHTML;
};

// Function to update cart modal
const updateCartModal = () => {
  const modalText = document.getElementById("modal-text");
  modalText.innerHTML = generateCartHTML(cart);
  if (cart.length === 0) {
    showModal(`Your cart is empty!`);
    return;
  }
};

// Main function to fetch and display books
const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:3000/Books");
    const books = await response.json();

    // Display books after 2 seconds (simulate loading)
    setTimeout(() => {
      displayBooks(books);
    }, 2000);

    // Add event listeners for search and filters
    const searchTerm = document.getElementById("search_name");
    const filterName = document.getElementById("filter_name");
    const filterYear = document.getElementById("filter_year");
    const filterGenre = document.getElementById("filter_genre");

    searchTerm.addEventListener("input", () => {
      const filteredBooks = filterBooks(
        books,
        searchTerm.value.toLowerCase(),
        filterName,
        filterYear,
        filterGenre
      );
      displayBooks(filteredBooks);
    });

    filterName.addEventListener("change", () => {
      updateSearchPlaceholder(filterName, filterYear, filterGenre);
      const filteredBooks = filterBooks(
        books,
        searchTerm.value.toLowerCase(),
        filterName,
        filterYear,
        filterGenre
      );
      displayBooks(filteredBooks);
    });

    filterYear.addEventListener("change", () => {
      updateSearchPlaceholder(filterName, filterYear, filterGenre);
      const filteredBooks = filterBooks(
        books,
        searchTerm.value.toLowerCase(),
        filterName,
        filterYear,
        filterGenre
      );
      displayBooks(filteredBooks);
    });

    filterGenre.addEventListener("change", () => {
      updateSearchPlaceholder(filterName, filterYear, filterGenre);
      const filteredBooks = filterBooks(
        books,
        searchTerm.value.toLowerCase(),
        filterName,
        filterYear,
        filterGenre
      );
      displayBooks(filteredBooks);
    });

    // Add click event listeners to book cards
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("book_card")) {
        const bookTitle = event.target.getAttribute("data-title");
        const book = books.find((b) => b.title === bookTitle);
        if (book) {
          checkClassicBook(book);
        }
      }
    });

    // Add click event listeners to "Buy Now" buttons
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("buy_book_button")) {
        const bookId = event.target.getAttribute("data-id");
        const book = books.find((book) => book.id == bookId);

        if (book) {
          // Check if book is already in cart
          let existingBook = cart.find((item) => item.id == book.id);
          if (existingBook) {
            existingBook.quantity++;
          } else {
            cart.push({ ...book, quantity: 1 });
          }
          updateCartCount();
          updateCartModal(); // Update the modal content
        }
      }
    });

    document.getElementById("cart_btn").addEventListener("click", () => {
      if (cart.length === 0) {
        showModal(`Your cart is empty!`);
        return;
      }

      showModal(generateCartHTML(cart));
    });

    // Function to handle cart updates (add, remove, delete)
    // Modify your existing delete/add/remove event listeners like this:
    document.addEventListener("click", (event) => {
      // Remove book quantity
      if (event.target.classList.contains("remove_book")) {
        const bookId = event.target.dataset.id;
        const book = cart.find((item) => item.id == bookId);
        if (book) {
          book.quantity--;
          if (book.quantity < 1) {
            cart = cart.filter((item) => item.id != bookId);
          }
          updateCartCount();
          updateCartModal(); // Update immediately without timeout
        }
      }

      // Add book quantity
      if (event.target.classList.contains("add_book")) {
        const bookId = event.target.dataset.id;
        const book = cart.find((item) => item.id == bookId);
        if (book) {
          book.quantity++;
          updateCartCount();
          updateCartModal(); // Update immediately without timeout
        }
      }

      // Delete book entirely
      if (event.target.classList.contains("delete")) {
        const bookId = event.target.dataset.id;
        cart = cart.filter((item) => item.id != bookId);
        updateCartCount();
        updateCartModal(); // Update immediately without timeout
      }
    });

    document.getElementById("modal").addEventListener("click", (event) => {
      if (event.target === document.getElementById("modal")) {
        closeModal();
      }
    });

    // Function to update cart count in the icon
    const updateCartCount = () => {
      const totalQuantity = cart.reduce(
        (total, book) => total + book.quantity,
        0
      );
      document.getElementById("total_count").innerText = totalQuantity;
    };

    // Flag and log large books
    flagLargeBooks(books, (flaggedBooks) => {
      getLargeBooks(flaggedBooks, (largeBooks) => {
        console.log("Large books with 500+ pages:", largeBooks);
      });
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Call the main function
fetchBooks();

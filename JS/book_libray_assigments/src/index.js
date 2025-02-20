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
          <p>Price: $${book.price}</p>
        </div>
      </div>`
    )
    .join("");

  document.getElementById("books").innerHTML = booksHTML;
};

// Function to filter books based on search and filters
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
        book.title.toLowerCase().includes(searchValue)
      ) {
        matches = true;
      }
      if (filterYear.checked && book.year.toString().includes(searchValue)) {
        matches = true;
      }
      if (
        filterGenre.checked &&
        book.genre.toLowerCase().includes(searchValue)
      ) {
        matches = true;
      }
      return matches;
    });
  }

  if (filterYear.checked) {
    filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
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

    let cart = [];
    // Add click event listeners to "Buy Now" buttons
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("buy_book_button")) {
        const bookId = event.target.getAttribute("data-id");
        const book = books.find((book) => book.id == bookId);

        if (book) {
          // Check if book is already in cart
          let existingBook = cart.find((item) => item.id == book.id);
          if (existingBook) {
            existingBook.quantity++; // Increase quantity if already in cart
          } else {
            cart.push({ ...book, quantity: 1 }); // Add new book with quantity
          }
          updateCartCount();
          showModal(
            `${book.title} ($${book.price}) has been added to your cart!`
          );
        }
      }
    });

    document.getElementById("cart_btn").addEventListener("click", () => {
      if (cart.length === 0) {
        showModal(`Your cart is empty!`);
        return;
      }

      let cartHTML = `<div class="cart_items">
        <h2>Your Cart</h2>
        <p>Total Books: ${cart.reduce(
          (total, book) => total + book.quantity,
          0
        )}</p>
        <ul>`;

      // Prevent duplicate display but show quantity
      cartHTML += cart
        .map(
          (book) => `
          <div}">
          <p><strong>${book.title}</strong></p>
          <hr /> 
           <li class="cart_item">
            <img src="${book.image}" alt="${book.title}" class="cart_image"/>
            <div class="cart_info">
              <p>Price: $${book.price}</p>
              <p>Quantity: ${book.quantity}</p>
            </div>
          </li>
        </div>
        `
        )
        .join("");

      cartHTML += `</ul>
        <hr />
        <p><strong>Total Price:</strong> $${cart.reduce(
          (sum, book) => sum + book.price * book.quantity,
          0
        )}</p>
        <button class="close_cart" onclick="closeModal()">Close</button>
      </div>`;

      showModal(cartHTML);
    });

    // 🔥 Function to update cart count in the icon
    function updateCartCount() {
      const totalQuantity = cart.reduce(
        (total, book) => total + book.quantity,
        0
      );
      document.getElementById("total_count").innerText = totalQuantity;
    }

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

// const dropdownFunction = () => {
//   document.getElementById("myDropdown").classList.toggle("show");
// };

// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     let dropdowns = document.getElementsByClassName("dropdown-content");

//     for (let i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show"); // Uncommented to close dropdown
//       }
//     }
//   }
// };

// const fetchBooks = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/Books");
//     const books = await response.json();

//     // Function to display books
//     const displayBooks = (userbooks) => {
//       return userbooks
//         .sort((a, b) => a.pages - b.pages) // Sort by pages first
//         .map(
//           (book) => `
//           <div class="book_card"> 
//             <img src="${book.image}" alt="Book Image" /> 
//             <hr />
//             <p>${" "} <strong> ${book.title} </strong> by <strong> ${
//             book.author
//           }</strong> ${" "} (${book.pages} pages)</p>
//           <hr/>
//             <p> <strong>Gener${" "}:</strong> ${
//             book.genre
//           } <strong>Publisher${" "}:</strong> ${
//             book.publisher
//           }<strong> Year${" "}: </strong> ${book.year} </p>
//             <p><strong>Description${" "}:</strong> ${book.description} </p>
//           </div>`
//         )
//         .join("");
//     };

//     // Insert books into the DOM
//     setTimeout(() => {
//       const bookinfo = displayBooks(books);
//       document.getElementById("books").innerHTML = bookinfo;
//     }, 2000);

//     const searchTerm = document.getElementById("search_name");
//     const filterName = document.getElementById("filter_name");
//     const filterYear = document.getElementById("filter_year");
//     const filterGenre = document.getElementById("filter_genre");

//     // Update the search placeholder based on selected filters
//     const updateSearchPlaceholder = () => {
//       let placeholderText = "Search...";

//       if (filterName.checked && filterYear.checked && filterGenre.checked) {
//         placeholderText = "Search by Name, Year, or Genre...";
//       } else if (filterName.checked && filterYear.checked) {
//         placeholderText = "Search by Name or Year...";
//       } else if (filterName.checked && filterGenre.checked) {
//         placeholderText = "Search by Name or Genre...";
//       } else if (filterYear.checked && filterGenre.checked) {
//         placeholderText = "Search by Year or Genre...";
//       } else if (filterName.checked) {
//         placeholderText = "Search by Name...";
//       } else if (filterYear.checked) {
//         placeholderText = "Search by Year...";
//       } else if (filterGenre.checked) {
//         placeholderText = "Search by Genre...";
//       } else {
//         placeholderText = "Search..."; // Default placeholder
//       }
//       searchTerm.placeholder = placeholderText;
//     };

//     // Filter functionality
//     const filterBooks = () => {
//       let searchValue = searchTerm.value.toLowerCase();
//       let filteredBooks = books;

//       // Apply search filter based on selected criteria
//       if (searchValue) {
//         filteredBooks = filteredBooks.filter((book) => {
//           let matches = false;
//           if (
//             filterName.checked &&
//             book.title.toLowerCase().includes(searchValue)
//           ) {
//             matches = true;
//           }
//           if (
//             filterYear.checked &&
//             book.year.toString().includes(searchValue)
//           ) {
//             matches = true;
//           }
//           if (
//             filterGenre.checked &&
//             book.genre.toLowerCase().includes(searchValue)
//           ) {
//             matches = true;
//           }
//           return matches;
//         });
//       }

//       // Apply sorting by year if checked
//       if (filterYear.checked) {
//         filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
//       }

//       if (filteredBooks.length > 0) {
//         document.getElementById("books").innerHTML =
//           displayBooks(filteredBooks);
//         document.getElementById("no-results").style.display = "none"; // Hide "no results" message
//       } else {
//         document.getElementById("books").innerHTML = ""; // Clear the book list
//         document.getElementById("no-results").style.display = "block"; // Show "no results" message
//       }

//       // Set a timeout to show "no results" after 2 minutes if no books are found
//       clearTimeout(window.noResultsTimeout); // Clear any existing timeout
//       if (filteredBooks.length === 0) {
//         window.noResultsTimeout = setTimeout(() => {
//           document.getElementById("no-results").innerHTML =
//             "<p>No matching books found after 2 minutes. Please try a different search.</p>";
//         }, 120000); // 2 minutes = 120,000 milliseconds
//       }

//       document.getElementById("books").innerHTML = displayBooks(filteredBooks);
//     };

//     // Event listeners for filters and search input
//     searchTerm.addEventListener("input", filterBooks);
//     filterName.addEventListener("change", () => {
//       updateSearchPlaceholder();
//       filterBooks();
//     });
//     filterYear.addEventListener("change", () => {
//       updateSearchPlaceholder();
//       filterBooks();
//     });
//     filterGenre.addEventListener("change", () => {
//       updateSearchPlaceholder();
//       filterBooks();
//     });

//     // Flag books with 500+ pages
//     const flagLargeBooks = (books, callbackFn) => {
//       setTimeout(() => {
//         const flaggedBooks = books.map((book) => ({
//           ...book,
//           isLargeBook: book.pages >= 500,
//         }));
//         callbackFn(flaggedBooks);
//       }, 1000);
//     };

//     // Filter large books
//     const getLargeBooks = (flaggedBooks, callbackFn) => {
//       setTimeout(() => {
//         const largeBooks = flaggedBooks.filter((book) => book.isLargeBook);
//         callbackFn(largeBooks);
//       }, 3000);
//     };

//     flagLargeBooks(books, (flaggedBooks) => {
//       getLargeBooks(flaggedBooks, (largeBooks) => {
//         console.log("Large books with 500+ pages:", largeBooks);
//       });
//     });

//     // show modal
//     const showModal = (message) => {
//       const modal = document.getElementById("modal");
//       const modalText = document.getElementById("modal-text");

//       modalText.innerText = message;
//       modal.style.display = "flex";
//     };
//     // hide modal
//     const closeModal = () => {
//       document.getElementById("modal").style.display = "none";
//     };
//     // check if a book is a classic
//     const checkClassicBooks = () => {
//       books.forEach((book) => {
//         if (book.year < 1900) {
//           showModal("This book is a classic!");
//         }
//       });
//     };
          
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }
// };

// // Call the function
// fetchBooks();

const dropdownFunction = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

// Close dropdown when clicking outside
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Fetch books from the server
const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:3000/Books");
    const books = await response.json();

    // Function to display books
    const displayBooks = (userbooks) => {
      const booksHTML = userbooks
        .sort((a, b) => a.pages - b.pages) // Sort by pages first
        .map(
          (book) => `
          <div class="book_card" data-title="${book.title}"> 
            <img src="${book.image}" alt="Book Image" /> 
            <hr />
            <p>${" "} <strong> ${book.title} </strong> by <strong> ${
            book.author
          }</strong> ${" "} (${book.pages} pages)</p>
            <hr/>
            <p> <strong>Gener${" "}:</strong> ${
            book.genre
          } <strong>Publisher${" "}:</strong> ${
            book.publisher
          }<strong> Year${" "}: </strong> ${book.year} </p>
            <p><strong>Description${" "}:</strong> ${book.description} </p>
          </div>`
        )
        .join("");

      // Insert books into the DOM
      document.getElementById("books").innerHTML = booksHTML;

      // Add click listeners to book cards
      addBookCardClickListeners(books);
    };

    // Insert books into the DOM after 2 seconds (simulate loading)
    setTimeout(() => {
      displayBooks(books);
    }, 2000);

    // Get DOM elements
    const searchTerm = document.getElementById("search_name");
    const filterName = document.getElementById("filter_name");
    const filterYear = document.getElementById("filter_year");
    const filterGenre = document.getElementById("filter_genre");

    // Update the search placeholder based on selected filters
    const updateSearchPlaceholder = () => {
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
      } else {
        placeholderText = "Search..."; // Default placeholder
      }
      searchTerm.placeholder = placeholderText;
    };

    // Filter functionality
    const filterBooks = () => {
      let searchValue = searchTerm.value.toLowerCase();
      let filteredBooks = books;

      // Apply search filter based on selected criteria
      if (searchValue) {
        filteredBooks = filteredBooks.filter((book) => {
          let matches = false;
          if (
            filterName.checked &&
            book.title.toLowerCase().includes(searchValue)
          ) {
            matches = true;
          }
          if (
            filterYear.checked &&
            book.year.toString().includes(searchValue)
          ) {
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

      // Apply sorting by year if checked
      if (filterYear.checked) {
        filteredBooks = filteredBooks.sort((a, b) => a.year - b.year);
      }

      // Display filtered books or "no results" message
      if (filteredBooks.length > 0) {
        displayBooks(filteredBooks);
        document.getElementById("no-results").style.display = "none"; // Hide "no results" message
      } else {
        document.getElementById("books").innerHTML = ""; // Clear the book list
        document.getElementById("no-results").style.display = "block"; // Show "no results" message
      }

      // Set a timeout to show "no results" after 2 minutes if no books are found
      clearTimeout(window.noResultsTimeout); // Clear any existing timeout
      if (filteredBooks.length === 0) {
        window.noResultsTimeout = setTimeout(() => {
          document.getElementById("no-results").innerHTML =
            "<p>No matching books found after 2 minutes. Please try a different search.</p>";
        }, 120000); // 2 minutes = 120,000 milliseconds
      }
    };

    // Event listeners for filters and search input
    searchTerm.addEventListener("input", filterBooks);
    filterName.addEventListener("change", () => {
      updateSearchPlaceholder();
      filterBooks();
    });
    filterYear.addEventListener("change", () => {
      updateSearchPlaceholder();
      filterBooks();
    });
    filterGenre.addEventListener("change", () => {
      updateSearchPlaceholder();
      filterBooks();
    });

    // Function to show modal
    const showModal = (message) => {
      const modal = document.getElementById("modal");
      const modalText = document.getElementById("modal-text");

      modalText.innerText = message;
      modal.style.display = "flex";
    };

    // Function to close modal
    const closeModal = () => {
      document.getElementById("modal").style.display = "none";
    };

    // Close modal when clicking outside the modal content
    window.onclick = function (event) {
      const modal = document.getElementById("modal");
      if (event.target === modal) {
        closeModal();
      }
    };

    // Close modal with Esc key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });

    // Function to check if a book is a classic (published in or before 1900)
    const checkClassicBook = (book) => {
      if (book.year <= 1900) {
        showModal(`This book is a classic! Published in ${book.year}.`);
      }
    };

    // Add click event listeners to book cards
    const addBookCardClickListeners = (books) => {
      const bookCards = document.querySelectorAll(".book_card");
      bookCards.forEach((card) => {
        card.addEventListener("click", () => {
          const bookTitle = card.getAttribute("data-title");
          const book = books.find((b) => b.title === bookTitle);
          if (book) {
            checkClassicBook(book);
          }
        });
      });
    };

    // Flag books with 500+ pages
    const flagLargeBooks = (books, callbackFn) => {
      setTimeout(() => {
        const flaggedBooks = books.map((book) => ({
          ...book,
          isLargeBook: book.pages >= 500,
        }));
        callbackFn(flaggedBooks);
      }, 1000);
    };

    // Filter large books
    const getLargeBooks = (flaggedBooks, callbackFn) => {
      setTimeout(() => {
        const largeBooks = flaggedBooks.filter((book) => book.isLargeBook);
        callbackFn(largeBooks);
      }, 3000);
    };

    flagLargeBooks(books, (flaggedBooks) => {
      getLargeBooks(flaggedBooks, (largeBooks) => {
        console.log("Large books with 500+ pages:", largeBooks);
      });
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

// Call the function
fetchBooks();

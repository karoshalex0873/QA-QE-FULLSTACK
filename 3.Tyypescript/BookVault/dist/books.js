var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addToCart } from "./cart";
export const fetchBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/mybooks");
        const books = yield response.json();
        if (!Array.isArray(books)) {
            throw new Error("Fetched data is not an array");
        }
        return books;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
// 3. Populate books
export const populateBooks = (books) => {
    try {
        const bookHTML = books
            .map((book) => `
      <div class="book_card" data-title="${book.title}">
        <img src="${book.image}" alt="${book.title}" />
        <hr />
        <p><strong>${book.title}</strong> by <strong>${book.author}</strong> (${book.pages} pages)</p>
        <hr />
        <p><strong>Genre:</strong> ${book.genre} <strong>Publisher:</strong> ${book.publisher} <strong>Year:</strong> ${book.year}</p>
        <div class="buy_book">
          <button
            class="buy_book_button"
            data-id="${book.id}"
            data-title="${book.title}"
            data-price="${book.price}"
            data-image="${book.image}"
          >
            Buy Now
          </button>
          <p><strong>Price:</strong> <span>ksh</span> ${book.price}</p>
        </div>
      </div>`)
            .join("");
        const booksDisplay = document.getElementById("books");
        if (booksDisplay) {
            booksDisplay.innerHTML = bookHTML;
        }
        else {
            throw new Error("Element with ID 'books' not found.");
        }
    }
    catch (error) {
        console.error("Error populating books:", error);
    }
};
// 4. Event listener with improved type safety
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("buy_book_button")) {
        const bookId = target.dataset.id;
        const title = target.dataset.title;
        const price = target.dataset.price;
        const image = target.dataset.image;
        if (bookId && title && price && image) {
            addToCart(parseInt(bookId), title, parseInt(price), image);
        }
        else {
            console.error("Missing data attributes on buy button");
        }
    }
});
// 5. Execute the fetch and populate flow
//# sourceMappingURL=books.js.map
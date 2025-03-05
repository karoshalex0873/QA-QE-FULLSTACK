import { addToCart } from "./cart";

export type BookInformationType = {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  price: number;
  image: string;
};

export const fetchBooks = async (): Promise<BookInformationType[]> => {
  try {
    const response = await fetch("http://localhost:3000/mybooks");
    const books: BookInformationType[] = await response.json();

    if (!Array.isArray(books)) {
      throw new Error("Fetched data is not an array");
    }
    return books;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 3. Populate books
export const populateBooks = (books: BookInformationType[]) => {
  try {
    const bookHTML = books
      .map(
        (book) => `
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
      </div>`
      )
      .join("");

    const booksDisplay = document.getElementById("books");
    if (booksDisplay) {
      booksDisplay.innerHTML = bookHTML;
    } else {
      throw new Error("Element with ID 'books' not found.");
    }
  } catch (error) {
    console.error("Error populating books:", error);
  }
};

// 4. Event listener with improved type safety
document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("buy_book_button")) {
    const bookId = target.dataset.id;
    const title = target.dataset.title;
    const price = target.dataset.price;
    const image = target.dataset.image;

    if (bookId && title && price && image) {
      addToCart(parseInt(bookId), title, parseInt(price), image);
    } else {
      console.error("Missing data attributes on buy button");
    }
  }
});

// 5. Execute the fetch and populate flow


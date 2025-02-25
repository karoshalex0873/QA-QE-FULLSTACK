import { addToCart } from "./cart";

 export type bookInformationType = {
  id: number,
  title: string,
  author: string,
  genre: string,
  year: number,
  pages: number,
  publisher: string,
  description: string,
  price: number
}

export const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:3000/Books")
     const books = await response.json();

    if (!Array.isArray(books)) {
      throw new Error("Fetched data is not an array")
    }

    const bookHTML= books.map((book) => (
      `
      <div class="book_card" data-title="${book.title}">
        <img src="${book.image}" alt="Book Image" />
        <hr />
        <p><strong>${book.title}</strong> by <strong>${book.author}</strong> (${book.pages} pages)</p>
        <hr />
        <p><strong>Genre:</strong> ${book.genre} <strong>Publisher:</strong> ${book.publisher} <strong>Year:</strong> ${book.year}</p>
        <div class="buy_book">
          <button 
            class="buy_book_button" 
            data-id="${book.id}" 
            data-title="${book.title}" 
            data-price="${book.price}">
            Buy Now
          </button>
          <p><strong>Price:</strong> <span>ksh</span> ${book.price}</p>
        </div>
      </div>`
    )).join('')

    let booksinfodisplay=document.getElementById('books')
    if(booksinfodisplay){
      booksinfodisplay.innerHTML = bookHTML
    }
    else{
      console.error("Element with ID 'books' not found.");
    } 
  } catch (error) {
    console.error("Error fetching your data")
  }
}

// adding eventListner to button Buy Now  when clicked
document.addEventListener("click",(event)=>{
  const target=event.target as HTMLElement

  if(target.classList.contains("buy_book_button")){
    const bookId = parseInt(target.getAttribute("data-id") || "0");
    const title = target.getAttribute("data-title") || "Unknown";
    const price = parseFloat(target.getAttribute("data-price") || "0");
    
    addToCart(bookId,title,price)
  }

})
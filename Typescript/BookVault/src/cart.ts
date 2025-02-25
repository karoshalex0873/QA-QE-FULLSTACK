
type cartType = {
  id: number,
  title: string,
  price: number
}

export let cart: cartType[] = [];

const incrementCount = document.getElementById("total_count");

export const addToCart = (bookId: number, title: string, price: number) => {
  cart.push({ id: bookId, title, price })
  if (incrementCount) incrementCount.textContent = cart.length.toString()
}


// Function to open modal and display cart details
export const showModal = () => {
  document.body.classList.add("modal-open");

  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");

  if (modal && modalText) {
    const cartDetails = cart.length
      ? cart.map((book) => `${book.title} - ksh ${book.price}`).join("<br>")
      : "Cart is empty";

    modalText.innerHTML = cartDetails;
    modal.style.display = "flex";
  } else {
    console.error("Modal elements not found!");
  }
};



// Function to close the modal
export const closeModal = () => {
  document.body.classList.remove("modal-open");
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  } else {
    console.error("Modal element not found!");
  }
};


// event listener  to close modal and open
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement
  if (target.classList.contains("close-btn")) {
    closeModal();
  }
  if (target.classList.contains("cart-count")) {
    showModal()
  }
})



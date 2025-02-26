export let cart = [];
// cart count increament in the cart// cart count increament in the cart 
const incrementCount = () => {
    const cartCountElement = document.getElementById("total_count");
    if (cartCountElement) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalQuantity.toString();
    }
};
// Function to add items to cart (with quantity tracking)
export const addToCart = (bookId, title, price, image) => {
    const existingItem = cart.find((item) => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({ id: bookId, title, price, quantity: 1, image });
    }
    incrementCount();
};
// Function to open modal and display cart details
export const showModal = () => {
    document.body.classList.add("modal-open");
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    if (modal && modalText) {
        modalText.innerHTML = generateCartHTML(cart);
        modal.style.display = "flex";
    }
    else {
        console.error("Modal elements not found!");
    }
};
// Function to close the modal
export const closeModal = () => {
    document.body.classList.remove("modal-open");
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
    else {
        console.error("Modal element not found!");
    }
};
// Event listener to close and open modal on cart btn
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("close-btn")) {
        closeModal();
    }
    if (target.classList.contains("cart-count")) {
        showModal();
    }
});
// Function to generate HTML for the cart
const generateCartHTML = (cart) => {
    if (cart.length === 0) {
        return `<h2>Your Cart</h2><p>Cart is empty.</p>`;
    }
    let cartHTML = `
    <h2>Your Cart</h2>
    <p><strong>Total Books:</strong> ${cart.reduce((total, book) => total + book.quantity, 0)}</p>
    <div class="modal-body">
  `;
    cartHTML += cart
        .map((book) => `
        <div class="cart-item_continer">
          <div class="cart-item">
            <p class="cart-title"><strong>${book.title}</strong></p>
            <div class="list-cart-item">
              <img src="${book.image}" alt="${book.title}" class="cart-image" />
              <div class="cart-info">
                <p><strong>Price: Ksh</strong> ${book.price}</p>
                <p><strong>Quantity:</strong> ${book.quantity}</p>
                <p><strong>Subtotal:</strong> Ksh ${book.price * book.quantity}</p>
                <div class="add-remove">
                  <button class="remove_book" data-id="${book.id}">-</button>
                  <span>${book.quantity}</span>
                  <button class="add_book" data-id="${book.id}">+</button> 
                </div>
              </div>
              <div class="delete_div">
                <p>Delete</p> 
                <button class="delete" data-id="${book.id}"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>`)
        .join("");
    cartHTML += `
    </div>
    <p><strong>Total Price:</strong> ksh ${cart.reduce((sum, book) => sum + book.price * book.quantity, 0)}</p>`;
    return cartHTML;
};
// function to add  delete and remove an item from the cart array 
// const updateCartList = () =>{
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete")) {
        cart = [];
        if (cart.length == 0) {
            return `<h2>Your Cart</h2><p>Cart is empty.</p>`;
        }
    }
    else {
        console.log(`erro`);
    }
});
// }
//# sourceMappingURL=cart.js.map
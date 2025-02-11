document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/products") // Ensure this URL is correct
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      console.log(data); // Debugging: Check if data is fetched correctly

      let productList = document.getElementById("listproducts");

      if (Array.isArray(data)) {
        productList.innerHTML = data
          .map(product => 
            `<div class="product">
               <h2>${product.name}</h2>
               <p><strong>Category:</strong> ${product.category}</p>
               <p><strong>Price:</strong> Ksh${product.price.toFixed(2)}</p>
               <p><strong>Description:</strong> ${product.description}</p>
               <p><strong>Stock Available:</strong> ${product.stock}</p>
             </div>`
          )
          .join(""); // Join the array to form a valid HTML string
      } else {
        productList.innerHTML = "<p>No products found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      document.getElementById("listproducts").innerHTML = "<p>Error loading products</p>";
    });
});

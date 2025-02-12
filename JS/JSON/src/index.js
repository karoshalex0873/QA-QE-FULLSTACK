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
             <img src="${product.image}" alt="${product.name}">
               <h2 class="heading">${product.name}</h2>
               <hr/>
               <p><strong>Category:</strong> ${product.category}</p>
               <p><strong>Price:</strong><span class="price"> Ksh${product.price.toFixed(2)}</span></p>
               <p><strong>Description:</strong> ${product.description}</p>
               <p><strong class="stock">Stock Available:</strong> ${product.stock}</p>
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
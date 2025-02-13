fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    // function to display data
    let productList = document.getElementById("listproducts");
    const displayData = (product) => {
      productList.innerHTML = product
        .map(
          (product) =>
            `<div class="product">
        <img src="${product.image}" alt="${product.name}">
         <h2 class="heading">${product.name}</h2>
         <hr/>
         <p><strong>Category:</strong> ${product.category}</p>
         <p><strong>Price:</strong><span class="price"> $${product.price.toFixed(
           2
         )}</span></p>
       <p><strong>Description:</strong> ${product.description}</p>
       <p><strong class="stock">Stock Available:</strong> ${product.stock}</p>
     </div>`
        )
        .join("");
    };
    displayData(data);

    // searching
    let searchInput=document.getElementById('search')
    //  adding and addEventListener

    searchInput.addEventListener("input", function () {
      let searchValue = this.value.toLowerCase();
      const filteredProducts = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      displayData(filteredProducts);
    });  
  });

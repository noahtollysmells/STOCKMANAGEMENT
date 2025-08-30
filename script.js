// Example dataset (replace with your real products later)
const products = [
  {
    id: 1,
    name: "Lenovo L13 YOGA",
    specs: "i7-1165g7, 16GB memory, 500GB SSD, 720p camera",
    price: "£395"
  },
  {
    id: 2,
    name: "Dell Latitude 7490",
    specs: "Intel i7, 16GB RAM, 512GB SSD",
    price: "£450"
  },
  {
    id: 3,
    name: "ThinkPad T14",
    specs: "Intel i5, 8GB RAM, 256GB SSD",
    price: "£320"
  },
  {
    id: 4,
    name: "HP EliteBook 840",
    specs: "Intel i7, 16GB RAM, 1TB SSD, Full HD",
    price: "£520"
  }
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

// Render product list
function renderProducts(list) {
  productList.innerHTML = "";
  if (list.length === 0) {
    productList.innerHTML = `<p style="text-align:center; color:#888;">No products found.</p>`;
    return;
  }

  list.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <button onclick="toggleDetails(${product.id})">View</button>
      <div class="details" id="details-${product.id}">
        <p><strong>Specs:</strong> ${product.specs}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </div>
    `;

    productList.appendChild(productDiv);
  });
}

// Initial render
renderProducts(products);

// Toggle details
function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display =
    details.style.display === "none" || details.style.display === ""
      ? "block"
      : "none";
}

// Search filter
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(value) || 
    product.specs.toLowerCase().includes(value) || 
    product.price.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});

// Mock data (you can replace this with fetched JSON from your server)
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
  }
];

// Render product list
const productList = document.getElementById("product-list");

products.forEach(product => {
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

// Toggle function
function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display = details.style.display === "none" || details.style.display === "" ? "block" : "none";
}

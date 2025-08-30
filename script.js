// Your Google Sheet CSV link
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRy4oNHqb6IGGRq87BVHs5GD69suWg9nX89R8W6rfMV8IfgZrZ8PImes-MX2_JkgYtcGJmH45M8V-M/pub?output=csv";

const productList = document.getElementById("product-list");

// Fetch and parse CSV
async function fetchProducts() {
  const response = await fetch(sheetURL);
  const data = await response.text();
  
  // Split into rows/columns
  const rows = data.split("\n").map(r => r.split(","));
  const headers = rows.shift().map(h => h.trim().toLowerCase());

  // Convert rows into objects
  const products = rows
    .filter(row => row.length > 1) // ignore blank rows
    .map(row => {
      let obj = {};
      headers.forEach((h, i) => obj[h] = row[i]?.trim());
      return obj;
    });

  // ✅ Always sort alphabetically by product name
  const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(sortedProducts);
}

// Render all products
function renderProducts(list) {
  productList.innerHTML = "";

  list.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <button onclick="toggleDetails('${product.id}')">View</button>
      <div class="details" id="details-${product.id}">
        <p><strong>Specs:</strong> ${product.specs}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </div>
    `;

    productList.appendChild(productDiv);
  });
}

// Toggle details
function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display =
    details.style.display === "none" || details.style.display === ""
      ? "block"
      : "none";
}

// Fetch on page load
fetchProducts();

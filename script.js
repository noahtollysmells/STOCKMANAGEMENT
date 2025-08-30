// Replace with your Google Sheet "Published CSV" link:
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRy4oNHqb6IGGRq87BVHs5GD69suWg9nX89R8W6rfMV8IfgZrZ8PImes-MX2_JkgYtcGJmH45M8V-M/pub?output=csv";

const productList = document.getElementById("product-list");

// Fetch and parse CSV
async function fetchProducts() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.text();
    const rows = data.split("\n").map(r => r.split(","));
    const headers = rows.shift().map(h => h.trim().toLowerCase());

    const products = rows
      .filter(row => row.length > 1)
      .map(row => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h] = row[i]?.trim();
        });
        return obj;
      });

    products.sort((a, b) => a.model.localeCompare(b.model));
    renderProducts(products);
  } catch (error) {
    productList.innerHTML = `<p style="color:#c00; text-align:center;">Failed to load products. Please check your URL.</p>`;
    console.error("Error fetching products:", error);
  }
}

// Render function
function renderProducts(list) {
  productList.innerHTML = "";

  if (!list.length) {
    productList.innerHTML = `<p style="text-align:center; color:#555;">No products available.</p>`;
    return;
  }

  list.forEach(product => {
    const safeName = product.model.replace(/\s+/g, "-");

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <h2>${product.model}</h2>
      <button onclick="toggleDetails('${safeName}')">View</button>
      <div class="details" id="details-${safeName}">
        <p><strong>Specs:</strong> ${product.specs}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </div>
    `;

    productList.appendChild(productDiv);
  });
}

// Toggle details visibility
function toggleDetails(name) {
  const details = document.getElementById(`details-${name}`);
  details.style.display =
    details.style.display === "none" || details.style.display === ""
      ? "block"
      : "none";
}

// Initialize
fetchProducts();

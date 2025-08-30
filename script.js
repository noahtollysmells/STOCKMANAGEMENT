// Your published Google Sheet "CSV" link:
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRy4oNHqb6IGGRq87BVHs5GD69suWg9nX89R8W6rfMV8IfgZrZ8PImes-MX2_JkgYtcGJmH45M8V-M/pub?output=csv";

const productList = document.getElementById("product-list");

// Simple CSV parser (handles commas in quotes)
function parseCSV(str) {
  const rows = [];
  let insideQuote = false;
  let row = [""];
  let i = 0;

  for (let char of str) {
    if (char === '"' && str[i - 1] !== "\\") {
      insideQuote = !insideQuote;
    } else if (char === "," && !insideQuote) {
      row.push("");
    } else if (char === "\n" && !insideQuote) {
      rows.push(row);
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
    i++;
  }
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

async function fetchProducts() {
  try {
    const response = await fetch(sheetURL);
    const data = await response.text();

    const rows = parseCSV(data);
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

    products.sort((a, b) => (a.model || "").localeCompare(b.model || ""));
    renderProducts(products);
  } catch (err) {
    console.error("Error loading products:", err);
    productList.innerHTML = `<p style="color:red; text-align:center;">Failed to load products. Please check your link.</p>`;
  }
}

function renderProducts(list) {
  productList.innerHTML = "";

  if (!list.length) {
    productList.innerHTML = `<p style="text-align:center; color:#555;">No products available.</p>`;
    return;
  }

  list.forEach(product => {
    const safeName = (product.model || "unknown").replace(/\s+/g, "-");

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <h2>${product.model || "Unnamed Product"}</h2>
      <button onclick="toggleDetails('${safeName}')">View</button>
      <div class="details" id="details-${safeName}">
        <p><strong>Specs:</strong> ${product.specs || "N/A"}</p>
        <p><strong>Price:</strong> ${product.price || "N/A"}</p>
      </div>
    `;

    productList.appendChild(productDiv);
  });
}

function toggleDetails(name) {
  const details = document.getElementById(`details-${name}`);
  details.style.display =
    details.style.display === "none" || details.style.display === ""
      ? "block"
      : "none";
}

fetchProducts();
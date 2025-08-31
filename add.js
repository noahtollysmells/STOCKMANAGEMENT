const SHEET_API_URL = "REPLACE_WITH_YOUR_WEB_APP_URL";
const CATALOG_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTy5o20ODcjm3Ev41jk9JnShb71FVq1iieVr_MkrReQLt0zJ5f9o1jCxHSSss0_cdS1-aDVd0wAxqvG/pub?output=csv";

async function loadCatalog() {
  let res = await fetch(CATALOG_URL);
  let text = await res.text();
  let rows = text.split("\n").map(r => r.split(","));
  let headers = rows.shift().map(h => h.toLowerCase().trim());

  let products = rows.map(r => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.model;
    li.onclick = () => selectProduct(p);
    list.appendChild(li);
  });
}

function selectProduct(product) {
  document.getElementById("productDetails").style.display = "block";
  document.getElementById("selectedModel").textContent = product.model;
  document.getElementById("selectedSpecs").textContent = product.specs;
  document.getElementById("selectedPrice").textContent = product.price;
  window.selectedProduct = product;
}

async function saveProduct() {
  const qty = parseInt(document.getElementById("quantity").value, 10);
  let payload = {
    action: "add",
    model: window.selectedProduct.model,
    specs: window.selectedProduct.specs,
    price: window.selectedProduct.price,
    quantity: qty
  };
  let res = await fetch(SHEET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  let result = await res.json();
  if (result.success) {
    alert("Product added!");
    window.location.href = "index.html";
  } else {
    alert("Error adding product");
  }
}

loadCatalog();

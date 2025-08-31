const SHEET_API_URL = "REPLACE_WITH_YOUR_WEB_APP_URL";

async function loadStock() {
  const search = document.getElementById("search");
  const list = document.getElementById("stock-list");

  let res = await fetch(SHEET_API_URL + "?list=true");
  let stock = await res.json();

  function render(items) {
    list.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.model}</strong> (x${item.quantity}) <button onclick="viewProduct('${item.id}')">View</button>`;
      list.appendChild(li);
    });
  }

  render(stock);

  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    render(stock.filter(item => item.model.toLowerCase().includes(term)));
  });
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

loadStock();

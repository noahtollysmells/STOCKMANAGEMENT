const SHEET_API_URL = "REPLACE_WITH_YOUR_WEB_APP_URL";

async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let res = await fetch(SHEET_API_URL + "?id=" + id);
  let product = await res.json();

  document.getElementById("productName").textContent = product.model;
  document.getElementById("productSpecs").textContent = product.specs;
  document.getElementById("productPrice").textContent = product.price;

  const url = window.location.href;
  QRCode.toCanvas(document.getElementById("qrcode"), url, function (err) {
    if (err) console.error(err);
  });
}

loadProduct();

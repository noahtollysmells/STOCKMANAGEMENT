const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRy4oNHqb6IGGRq87BVHs5GD69suWg9nX89R8W6rfMV8IfgZrZ8PImes-MX2_JkgYtcGJmH45M8V-M/pub?output=csv";

function getParam(name) {
  const p = new URLSearchParams(window.location.search).get(name);
  return p ? decodeURIComponent(p) : "";
}

function fetchProducts() {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject
    });
  });
}

function normalize(rows) {
  return rows.map(r => ({
    model: (r.Model || r.model || '').trim(),
    specs: (r.Specs || r.specs || '').trim(),
    price: (r.Price || r.price || '').trim()
  })).filter(x => x.model);
}

async function init() {
  const modelParam = getParam('model').trim();
  const titleEl = document.getElementById('title');
  const specsEl = document.getElementById('specs');
  const priceEl = document.getElementById('price');

  try {
    const rows = await fetchProducts();
    const items = normalize(rows);

    // Find by exact match (case-insensitive)
    const product = items.find(p => p.model.toLowerCase() === modelParam.toLowerCase());

    if (!product) {
      titleEl.textContent = 'Product not found';
      specsEl.textContent = '—';
      priceEl.textContent = '—';
      new QRCode(document.getElementById("qrcode"), window.location.href);
      return;
    }

    titleEl.textContent = product.model;
    specsEl.textContent = product.specs || '—';
    priceEl.textContent = product.price || '—';

    // Build absolute URL for QR: works on GitHub Pages or any host
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('model', encodeURIComponent(product.model));
    const finalURL = url.toString();

    // Render QR code that points to THIS product page
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
      text: finalURL,
      width: 180,
      height: 180,
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {
    console.error(e);
    titleEl.textContent = 'Error loading product';
  }
}

init();

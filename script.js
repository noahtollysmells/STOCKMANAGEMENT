// Main listing page logic
const SHEET_URL = window.__SHEET_URL__ || "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRy4oNHqb6IGGRq87BVHs5GD69suWg9nX89R8W6rfMV8IfgZrZ8PImes-MX2_JkgYtcGJmH45M8V-M/pub?output=csv";
const listEl = document.getElementById('product-list');
const searchEl = document.getElementById('search');
let ALL = [];

// Fetch + parse CSV via PapaParse for reliability
async function fetchProducts() {
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

function render(list) {
  listEl.innerHTML = "";
  const tpl = document.getElementById('product-card-tpl');

  if (!list || !list.length) {
    listEl.innerHTML = '<p style="color:#9ca3af;text-align:center;width:100%;">No products found.</p>';
    return;
  }

  list.forEach(p => {
    const model = (p.Model || p.model || "").trim();
    if (!model) return;
    const node = tpl.content.cloneNode(true);
    node.querySelector('.model').textContent = model;
    const href = 'product.html?model=' + encodeURIComponent(model);
    node.querySelector('.view-btn').setAttribute('href', href);
    listEl.appendChild(node);
  });
}

function normalizeProducts(rows) {
  return rows.map(r => ({
    model: (r.Model || r.model || '').trim(),
    specs: (r.Specs || r.specs || '').trim(),
    price: (r.Price || r.price || '').trim()
  })).filter(x => x.model);
}

function sortAlpha(list) {
  return list.sort((a,b) => a.model.localeCompare(b.model, undefined, {sensitivity:'base'}));
}

async function init() {
  try {
    const rows = await fetchProducts();
    ALL = sortAlpha(normalizeProducts(rows));
    render(ALL);
  } catch (e) {
    console.error(e);
    listEl.innerHTML = '<p style="color:#ef4444;text-align:center">Failed to load products.</p>';
  }
}

searchEl.addEventListener('input', () => {
  const q = searchEl.value.toLowerCase();
  const filtered = ALL.filter(p => 
    p.model.toLowerCase().includes(q) ||
    p.specs.toLowerCase().includes(q) ||
    p.price.toLowerCase().includes(q)
  );
  render(filtered);
});

init();

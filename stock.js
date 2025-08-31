// ---------------- Supabase Connection ----------------
const SUPABASE_URL = "https://xvkohuavbynrzmchxriq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elements
const stockList = document.getElementById("stock-list");
const searchInput = document.getElementById("search");
let allStock = [];

// ---------------- Load Stock ----------------
async function loadStock() {
  const { data, error } = await supabase.from("stock").select("*");
  if (error) {
    console.error("Error loading stock:", error.message);
    stockList.innerHTML = "<p>⚠️ Could not load stock.</p>";
    return;
  }
  allStock = data;
  renderStock(allStock);
}

// ---------------- Render Stock ----------------
function renderStock(list) {
  stockList.innerHTML = "";
  if (list.length === 0) {
    stockList.innerHTML = "<p>No products in stock yet.</p>";
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("stock-item");
    div.innerHTML = `
      <h2>${item.model}</h2>
      <p><strong>In Stock:</strong> ${item.qty}</p>
      <a href="product.html?model=${encodeURIComponent(item.model)}">
        <button>View</button>
      </a>
    `;
    stockList.appendChild(div);
  });
}

// ---------------- Search ----------------
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = allStock.filter(p =>
    (p.model && p.model.toLowerCase().includes(term)) ||
    (p.specs && p.specs.toLowerCase().includes(term)) ||
    (p.price && p.price.toLowerCase().includes(term))
  );
  renderStock(filtered);
});

// ---------------- Start ----------------
loadStock();

const supabaseUrl = "https://xvkohuavbynrzmchxriq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadStock() {
  let { data: stock, error } = await supabase.from("stock").select("*");
  if (error) return console.error(error);

  const list = document.getElementById("stock-list");
  list.innerHTML = "";

  stock.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.model} (${item.quantity} in stock)</span>
      <button onclick="viewProduct(${item.id})">View</button>
    `;
    list.appendChild(li);
  });
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll("#stock-list li").forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(term) ? "" : "none";
  });
});

loadStock();

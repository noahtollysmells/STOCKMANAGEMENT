const supabaseUrl = "https://xvkohuavbynrzmchxriq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadStock() {
  const search = document.getElementById("search");
  const list = document.getElementById("stock-list");

  let { data: stock, error } = await supabase.from("stock").select("*");

  if (error) {
    console.error(error);
    return;
  }

  function render(items) {
    list.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${item.model}</strong> (x${item.quantity}) <button onclick="viewProduct(${item.id})">View</button>`;
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

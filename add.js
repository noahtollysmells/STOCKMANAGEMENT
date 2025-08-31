const supabaseUrl = "https://xvkohuavbynrzmchxriq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadCatalog() {
  let { data: products, error } = await supabase.from("catalog").select("*").order("model");

  if (error) {
    console.error("Error loading catalog:", error);
    return;
  }

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
  const { error } = await supabase.from("stock").insert([{
    model: window.selectedProduct.model,
    specs: window.selectedProduct.specs,
    price: window.selectedProduct.price,
    quantity: qty
  }]);

  if (error) {
    console.error("Error saving product:", error);
    alert("Error adding product");
  } else {
    alert("Product added!");
    window.location.href = "index.html";
  }
}

loadCatalog();

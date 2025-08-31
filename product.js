const supabase = window.supabase.createClient(
  "https://xvkohuavbynrzmchxriq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY"
);

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
  let { data, error } = await supabase.from("stock").select("*").eq("id", productId).single();
  if (error) return console.error(error);

  document.getElementById("productName").textContent = data.model;
  document.getElementById("productSpecs").textContent = data.specs;
  document.getElementById("productPrice").textContent = data.price;
  document.getElementById("productQty").textContent = data.quantity;

  const url = window.location.href;
  QRCode.toCanvas(document.getElementById("qrCode"), url, function (err) {
    if (err) console.error(err);
  });
}

loadProduct();

const supabaseUrl = "https://xvkohuavbynrzmchxriq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let { data: products, error } = await supabase.from("stock").select("*").eq("id", id).single();

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("productName").textContent = products.model;
  document.getElementById("productSpecs").textContent = products.specs;
  document.getElementById("productPrice").textContent = products.price;

  const url = window.location.href;
  QRCode.toCanvas(document.getElementById("qrcode"), url, function (err) {
    if (err) console.error(err);
  });
}

loadProduct();

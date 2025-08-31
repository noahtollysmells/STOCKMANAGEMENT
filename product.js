// ---------------- Supabase Connection ----------------
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-KEY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------- Get Model from URL ----------------
const params = new URLSearchParams(window.location.search);
const modelName = params.get("model");

// Elements
const container = document.getElementById("product-details");

// ---------------- Load Product ----------------
async function loadProduct() {
  if (!modelName) {
    container.innerHTML = "<p>⚠️ No product selected.</p>";
    return;
  }

  const { data, error } = await supabase
    .from("stock")
    .select("*")
    .eq("model", modelName)
    .limit(1);

  if (error) {
    console.error(error);
    container.innerHTML = "<p>⚠️ Error loading product.</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>❌ Product not found.</p>";
    return;
  }

  const product = data[0];

  container.innerHTML = `
    <h2>${product.model}</h2>
    <p><strong>Specs:</strong> ${product.specs}</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Quantity:</strong> ${product.qty}</p>
    <div id="qrcode"></div>
  `;

  // Generate QR code that links back to this page
  new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 128,
    height: 128
  });
}

loadProduct();

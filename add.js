// ---------------- Supabase Connection ----------------
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-KEY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elements
const form = document.getElementById("addForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const model = form.model.value.trim();
  const specs = form.specs.value.trim();
  const price = form.price.value.trim();
  const qty = parseInt(form.qty.value, 10) || 1;

  const { error } = await supabase.from("stock").insert([
    { model, specs, price, qty }
  ]);

  if (error) {
    alert("❌ Error saving: " + error.message);
  } else {
    alert("✅ Product added to stock!");
    window.location.href = "index.html";
  }
});

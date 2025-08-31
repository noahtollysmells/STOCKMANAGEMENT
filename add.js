// ---------------- Supabase Connection ----------------
const SUPABASE_URL = "https://xvkohuavbynrzmchxriq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a29odWF2YnlucnptY2h4cmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDMzMTQsImV4cCI6MjA3MjIxOTMxNH0.pW1yCTOZfSvJg4wCJkp7hScqcq5_WHc8zq_0hUji0TYY";
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

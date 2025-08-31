
const STOCK_KEY = 'stock-items-v2';

function loadStock(){
  try{
    const raw = localStorage.getItem(STOCK_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    localStorage.removeItem(STOCK_KEY);
    return {};
  }
}
function saveStock(obj){
  localStorage.setItem(STOCK_KEY, JSON.stringify(obj));
}

let CATALOG = [];
const listEl = document.getElementById('catalogList');
const tpl = document.getElementById('catalogItemTpl');
const s = id => document.getElementById(id);

async function loadCatalog(){
  const res = await fetch('products.json');
  const arr = await res.json();
  // normalise + sort
  CATALOG = arr.map(x => ({
    model: (x.model||'').trim(),
    specs: (x.specs||'').trim(),
    price: (x.price||'').trim()
  })).filter(x=>x.model);
  CATALOG.sort((a,b)=> a.model.localeCompare(b.model, undefined, {sensitivity:'base'}));
}

function renderCatalog(items){
  listEl.innerHTML = '';
  if(!items.length){
    listEl.innerHTML = '<p style="color:#9ca3af">No matches.</p>';
    return;
  }
  items.forEach(item=>{
    const node = tpl.content.cloneNode(true);
    node.querySelector('.name').textContent = item.model;
    const btn = node.querySelector('.pick');
    btn.addEventListener('click', ()=> pickItem(item));
    listEl.appendChild(node);
  });
}

function pickItem(item){
  s('fModel').value = item.model;
  s('fSpecs').value = item.specs;
  s('fPrice').value = item.price;
  s('fQty').value = 1;
  window.scrollTo({top:0, behavior:'smooth'});
}

function filter(items, q){
  q = q.toLowerCase();
  return items.filter(x => x.model.toLowerCase().includes(q) || x.specs.toLowerCase().includes(q));
}

function addToStock(){
  const model = s('fModel').value.trim();
  const specs = s('fSpecs').value.trim();
  const price = s('fPrice').value.trim();
  const qty = Math.max(1, parseInt(s('fQty').value || '1', 10));

  if(!model){
    alert('Please select or enter a model.');
    return;
  }

  const stock = loadStock();
  if(stock[model]){
    // increment quantity; update specs/price with latest edits
    stock[model].qty = Number(stock[model].qty||0) + qty;
    stock[model].specs = specs || stock[model].specs;
    stock[model].price = price || stock[model].price;
  }else{
    stock[model] = { model, specs, price, qty };
  }
  saveStock(stock);
  alert('Added to stock.');
  window.location.href = 'index.html';
}

document.getElementById('addBtn').addEventListener('click', addToStock);

(async function init(){
  await loadCatalog();
  renderCatalog(CATALOG);
  const search = document.getElementById('catalogSearch');
  search.addEventListener('input', ()=>{
    renderCatalog(filter(CATALOG, search.value));
  });
})();

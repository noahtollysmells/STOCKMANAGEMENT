
// Local storage keys
const STOCK_KEY = 'stock-items-v2';

function loadStock(){
  try{
    const raw = localStorage.getItem(STOCK_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.error('Bad stock JSON, resetting', e);
    localStorage.removeItem(STOCK_KEY);
    return {};
  }
}

function saveStock(obj){
  localStorage.setItem(STOCK_KEY, JSON.stringify(obj));
}

function toList(obj){
  return Object.values(obj || {});
}

function ensureNums(x){
  x.qty = Number(x.qty||0);
  return x;
}

function sortAlpha(list){
  return list.sort((a,b)=> a.model.localeCompare(b.model, undefined, {sensitivity:'base'}));
}

const grid = document.getElementById('stock-grid');
const tpl = document.getElementById('stock-card-tpl');
const search = document.getElementById('search');

function render(list){
  grid.innerHTML = '';
  if(!list.length){
    grid.innerHTML = '<p style="text-align:center;color:#9ca3af">No items in stock yet. Click “Add Product”.</p>';
    return;
  }
  list.forEach(p=>{
    const node = tpl.content.cloneNode(true);
    node.querySelector('.model').textContent = p.model;
    node.querySelector('.qty').textContent = `In stock: ${p.qty}`;
    node.querySelector('.view').setAttribute('href', 'product.html?model=' + encodeURIComponent(p.model));
    grid.appendChild(node);
  });
}

function filter(list, q){
  q = q.toLowerCase();
  return list.filter(p =>
    p.model.toLowerCase().includes(q) ||
    (p.specs||'').toLowerCase().includes(q) ||
    (p.price||'').toLowerCase().includes(q)
  );
}

function init(){
  const stockObj = loadStock();
  const list = sortAlpha(toList(stockObj).map(ensureNums));
  render(list);
  search.addEventListener('input', ()=>{
    const q = search.value;
    const base = sortAlpha(toList(loadStock()).map(ensureNums));
    render(filter(base, q));
  });
}
init();

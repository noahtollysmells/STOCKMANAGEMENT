
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

function getParam(name){
  return new URLSearchParams(window.location.search).get(name) || '';
}

function showProduct(model){
  const stock = loadStock();
  const item = stock[model];
  const title = document.getElementById('title');
  const specs = document.getElementById('specs');
  const price = document.getElementById('price');
  const qty = document.getElementById('qty');

  if(!item){
    title.textContent = 'Not in stock';
    specs.textContent = '—';
    price.textContent = '—';
    qty.textContent = '0';
  }else{
    title.textContent = item.model;
    specs.textContent = item.specs || '—';
    price.textContent = item.price || '—';
    qty.textContent = String(item.qty || 0);
  }

  // Build a shareable URL for QR that always lands on this exact product
  const base = new URL(window.location.href);
  base.search = ''; // reset params
  base.searchParams.set('model', model);
  const url = base.toString();

  const cont = document.getElementById('qrcode');
  cont.innerHTML = '';
  new QRCode(cont, { text: url, width: 180, height: 180, correctLevel: QRCode.CorrectLevel.M });
}

(function init(){
  const model = getParam('model');
  if(!model){
    document.getElementById('title').textContent = 'No product selected';
    return;
  }
  // decode in case model was encoded
  const decoded = decodeURIComponent(model);
  showProduct(decoded);
})();

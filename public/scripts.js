let currentPage = 1;
const productsPerPage = 5;
let allProducts = [];
let sortState = { column: null, direction: null };

window.onload = () => {
  document.getElementById('name-sort')?.addEventListener('click', () => toggleSort('name'));
  document.getElementById('price-sort')?.addEventListener('click', () => toggleSort('price'));
  loadProducts();
};

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    allProducts = await response.json();
    if (currentPage > getTotalPages() && currentPage > 1) currentPage = getTotalPages();
    render();
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

function getTotalPages() {
  return Math.ceil(allProducts.length / productsPerPage);
}

function render() {
  renderProducts();
  renderPagination();
}

function renderProducts() {
  const tbody = document.getElementById('products-table-body');
  tbody.innerHTML = '';

  let sorted = [...allProducts];
  if (sortState.column && sortState.direction) {
    sorted.sort((a, b) => {
      const valA = sortState.column === 'name' ? a.name.toLowerCase() : Number(a.price);
      const valB = sortState.column === 'name' ? b.name.toLowerCase() : Number(b.price);
      return sortState.direction === 'asc' ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
    });
  }

  const start = (currentPage - 1) * productsPerPage;
  sorted.slice(start, start + productsPerPage).forEach(product => {
    const tr = document.createElement('tr');
    const imgSrc = product.image_url ? `/images/${product.image_url}` : 'https://www.pngkey.com/png/detail/207-2079264_download-placeholder-icon-svg.png';

    tr.innerHTML = `
      <td><img src="${imgSrc}" alt="${product.name}" width="60" height="60"></td>
      <td>${product.name}</td>
      <td>$${Number(product.price).toFixed(2)}</td>
    `;

    const actionsTd = document.createElement('td');
    actionsTd.classList.add('actions-cell');

    const viewIcon = document.createElement('span');
    viewIcon.innerHTML = '<span class="material-symbols-outlined search-icon" title="View">search</span>';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.innerHTML = '<span class="material-symbols-outlined delete-icon" title="Delete">delete</span>';
    deleteBtn.addEventListener('click', () => handleDelete(product.id, product.name));

    actionsTd.append(viewIcon, deleteBtn);
    tr.appendChild(actionsTd);
    tbody.appendChild(tr);
  });

  updateSortIcons();
}

function renderPagination() {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const totalPages = getTotalPages();
  const createPageLink = (label, action, disabled = false, active = false) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = label;
    link.className = `page-number${active ? ' active' : ''}${disabled ? ' disabled' : ''}`;
    link.addEventListener('click', e => {
      e.preventDefault();
      if (!disabled) action();
    });
    return link;
  };

  pagination.appendChild(createPageLink('«', () => { if (currentPage > 1) { currentPage--; render(); } }, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createPageLink(i, () => { currentPage = i; render(); }, false, i === currentPage));
  }

  pagination.appendChild(createPageLink('»', () => { if (currentPage < totalPages) { currentPage++; render(); } }, currentPage === totalPages));
}

async function handleDelete(productId, productName) {
  if (await showConfirm(`Are you sure you want to delete "${productName}"?`)) {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting');
      await loadProducts();
    } catch (err) {
      console.error(err);
    }
  }
}

function showConfirm(message) {
  return new Promise(resolve => {
    const dialog = document.getElementById('confirm-dialog');
    const msgEl = document.getElementById('confirm-message');
    const yesBtn = document.getElementById('confirm-yes');
    const noBtn = document.getElementById('confirm-no');

    msgEl.textContent = message;
    dialog.classList.remove('hidden');

    const cleanup = () => {
      dialog.classList.add('hidden');
      yesBtn.removeEventListener('click', onYes);
      noBtn.removeEventListener('click', onNo);
    };

    const onYes = () => { cleanup(); resolve(true); };
    const onNo = () => { cleanup(); resolve(false); };

    yesBtn.addEventListener('click', onYes);
    noBtn.addEventListener('click', onNo);
  });
}

function toggleSort(column) {
  if (sortState.column === column) {
    sortState.direction = sortState.direction === 'asc' ? 'desc' : sortState.direction === 'desc' ? null : 'asc';
    if (!sortState.direction) sortState.column = null;
  } else {
    sortState.column = column;
    sortState.direction = 'asc';
  }

  currentPage = 1;
  render();
}

function updateSortIcons() {
  const icons = {
    name: document.getElementById('name-sort'),
    price: document.getElementById('price-sort')
  };

  Object.keys(icons).forEach(col => {
    const icon = icons[col];
    if (!icon) return;
    icon.textContent = 'swap_vert';
    icon.style.transform = '';

    if (sortState.column === col) {
      if (sortState.direction === 'asc') {
        icon.textContent = 'sort';
        icon.style.transform = 'rotate(180deg)';
      } else if (sortState.direction === 'desc') {
        icon.textContent = 'sort';
        icon.style.transform = 'rotate(0deg)';
      }
    }
  });
}

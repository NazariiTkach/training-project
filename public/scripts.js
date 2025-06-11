let currentPage = 1;
const productsPerPage = 5;
let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    allProducts = await response.json();
    const totalPages = getTotalPages();

  
    if (currentPage > totalPages && currentPage > 1) {
      currentPage = totalPages;
    }

    renderProducts();
    renderPagination();
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

function getTotalPages() {
  return Math.ceil(allProducts.length / productsPerPage);
}

function renderProducts() {
  const tbody = document.getElementById('products-table-body');
  tbody.innerHTML = '';

  const start = (currentPage - 1) * productsPerPage;
  const paginatedProducts = allProducts.slice(start, start + productsPerPage);

  paginatedProducts.forEach(product => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><img src="${product.image_url || 'https://www.pngkey.com/png/detail/207-2079264_download-placeholder-icon-svg.png'}" alt="${product.name}" width="60" height="60"></td>
      <td>${product.name}</td>
      <td>$${Number(product.price).toFixed(2)}</td>
      <td><span class="material-symbols-outlined search-icon">search</span></td>
    `;

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.classList.add('delete-button');

    deleteBtn.addEventListener('click', () => handleDelete(product.id, product.name));

    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);
  });
}

async function handleDelete(productId, productName) {
  if (!confirm(`Delete "${productName}"?`)) return;

  try {
    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting');

    await loadProducts(); 
  } catch (err) {
    console.error(err);
  }
}

function renderPagination() {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  const totalPages = getTotalPages();

  const createPageLink = (label, onClick, disabled = false, isActive = false) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = label;
    link.className = isActive ? 'page-number active' : 'page-number';
    if (disabled) link.classList.add('disabled');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (!disabled) onClick();
    });
    return link;
  };

  pagination.appendChild(createPageLink('«', () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination();
    }
  }, currentPage === 1));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createPageLink(i, () => {
      currentPage = i;
      renderProducts();
      renderPagination();
    }, false, i === currentPage));
  }

  pagination.appendChild(createPageLink('»', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      renderPagination();
    }
  }, currentPage === totalPages));
}

window.onload = loadProducts;

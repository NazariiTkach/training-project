async function loadProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
  
      const tbody = document.getElementById('products-table-body');
      tbody.innerHTML = '';
  
      products.forEach(product => {
        const tr = document.createElement('tr');
  
        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.image_url; // replace with the correct image
        img.alt = product.name;
        imgTd.appendChild(img);
      
        
  
        const nameTd = document.createElement('td');
        nameTd.textContent = product.name;
  
        const priceTd = document.createElement('td');
        priceTd.textContent =`$${Number(product.price).toFixed(2)}`;
  
        const viewTd = document.createElement('td');
        viewTd.innerHTML = `
          <span class="material-symbols-outlined search-icon">
            search
          </span>
        `;
  
        tr.appendChild(imgTd);
        tr.appendChild(nameTd);
        tr.appendChild(priceTd);
        tr.appendChild(viewTd);
  
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }
  
  window.onload = loadProducts;
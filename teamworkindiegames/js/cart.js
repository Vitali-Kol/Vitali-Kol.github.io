const menuToggle = document.getElementById('menu-toggle');
const header = document.getElementById('site-header');

menuToggle.addEventListener('click', () => {
  header.classList.toggle('open');
});

const sortOrder = {};

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="font-size: 18px;">Your cart is empty.</p>';
    document.querySelector('.total-price').textContent = '';
    return;
  }

  let html = `
    <table style="width: 100%; border-collapse: collapse; margin: 0 auto;">
      <thead>
        <tr style="background: #C3825B; color: #F7F2EC; font-size: 16px;">
          <th style="padding: 10px; border: 1px solid #ddd;">#</th>
          <th style="padding: 10px; border: 1px solid #ddd; cursor: pointer;" data-key="title">Title</th>
          <th style="padding: 10px; border: 1px solid #ddd; cursor: pointer;" data-key="developer">Developer</th>
          <th style="padding: 10px; border: 1px solid #ddd; cursor: pointer;" data-key="release">Release Date</th>
          <th style="padding: 10px; border: 1px solid #ddd; cursor: pointer;" data-key="price">Price</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Action</th>
        </tr>
      </thead>
      <tbody style="font-size: 16px;">
  `;

  cart.forEach((item, index) => {
    html += `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.title}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.developer}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.release}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.price}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
          <button class="delete-btn" data-index="${index}" style="padding:5px 10px; background: #e60000; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
        </td>
      </tr>
    `;
  });

  html += '</tbody></table>';
  cartItemsContainer.innerHTML = html;

  const headerCells = cartItemsContainer.querySelectorAll('th[data-key]');
  headerCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const key = cell.getAttribute('data-key');
      sortOrder[key] = sortOrder[key] === undefined ? true : !sortOrder[key];

      headerCells.forEach(h => {
        h.classList.remove('sorted-asc', 'sorted-desc');
      });

      cell.classList.add(sortOrder[key] ? 'sorted-asc' : 'sorted-desc');
      sortCart(key, sortOrder[key]);
      showNotification(`Sorted by ${key} (${sortOrder[key] ? 'asc' : 'desc'})`);
    });
  });

  addDeleteEventListeners();
  updateTotalPrice();
}

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      let index = parseInt(button.getAttribute('data-index'));
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
      showNotification("Item removed from cart!");
    });
  });
}

function updateTotalPrice() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  cart.forEach(item => {
    let priceNum = parseFloat(item.price.replace('$', ''));
    if (!isNaN(priceNum)) {
      total += priceNum;
    }
  });

  document.querySelector('.total-price').textContent = `Total: $${total.toFixed(2)}`;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElems = document.querySelectorAll('.cart-count');
  cartCountElems.forEach(elem => {
    elem.textContent = cart.length;
  });
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  notification.addEventListener('click', hideNotification);
  setTimeout(() => {
    hideNotification();
  }, 3000);
}

function hideNotification() {
  const notification = document.getElementById('notification');
  notification.classList.remove('show');
  notification.removeEventListener('click', hideNotification);
}

function sortCart(key, ascending = true) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (key === 'price') {
    cart.sort((a, b) => {
      let priceA = parseFloat(a.price.replace('$', ''));
      let priceB = parseFloat(b.price.replace('$', ''));
      return ascending ? priceA - priceB : priceB - priceA;
    });
  } else if (key === 'release') {
    cart.sort((a, b) => {
      let dateA = new Date(a.release);
      let dateB = new Date(b.release);
      return ascending ? dateA - dateB : dateB - dateA;
    });
  } else {
    cart.sort((a, b) => {
      let textA = a[key].toUpperCase();
      let textB = b[key].toUpperCase();
      if (textA < textB) return ascending ? -1 : 1;
      if (textA > textB) return ascending ? 1 : -1;
      return 0;
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

updateCartCount();
renderCart();

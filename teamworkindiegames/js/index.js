const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

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

updateCartCount();

const menuToggle = document.getElementById('menu-toggle');
const header = document.getElementById('site-header');

menuToggle.addEventListener('click', () => {
  header.classList.toggle('open');
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      title: button.dataset.title,
      developer: button.dataset.developer,
      release: button.dataset.release,
      price: button.dataset.price,
      description: button.dataset.description
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification("Item added to cart!");
  });
});

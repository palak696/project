document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    let cart = [];

    
    document.querySelector('.fa-user').addEventListener('click', function (e) {
        e.preventDefault();
        const loginSection = document.getElementById('userlogin');
        loginSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelector('.fa-shopping-cart').addEventListener('click', function (e) {
        e.preventDefault();
        const cartSection = document.getElementById('carticon');
        cartSection.scrollIntoView({ behavior: 'smooth' });
    });

    
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '1234') {
            alert(Login successful! Welcome, ${username}.);
            window.location.href = '#home';
        } else {
            alert('Invalid username or password.');
        }
    });

   
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = button.getAttribute('data-price');

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
            }

            updateCartUI();
        });
    });

    
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty. Start adding items!</p>';
            checkoutBtn.style.display = 'none';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            checkoutBtn.style.display = 'block';
        }
    }

   
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout!');
        cart = [];
        updateCartUI();
    });
});
// Cart.js

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('Cart.html')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const buyBtn = document.getElementById('buy-btn');

        // Function to display cart items
        const displayCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                cartTotalElement.textContent = '0 VND';
                return;
            }

            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/150x150?text=Placeholder'">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('en-US')} VND</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
                total += item.price;
            });

            cartTotalElement.textContent = `${total.toLocaleString('en-US')} VND`;
        };

        // Function to remove item from cart
        window.removeFromCart = (index) => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
            showNotification('Item removed from cart!');
        };

        // Handle "Buy" button
        buyBtn.addEventListener('click', () => {
            if (!checkLogin()) {
                showNotification('Please login to checkout!', () => {
                    window.location.href = '../HTML/Login.html';
                });
                return;
            }

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }

            // Giả lập thanh toán thành công
            localStorage.removeItem('cart');
            updateCartCount();
            displayCart();
            showNotification('Checkout successful! Thank you for your purchase.');
        });

        // Initial display of cart
        displayCart();
    }
});
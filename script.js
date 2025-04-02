// script.js
const allProducts = [
    { id: 1, name: "Traditional Ao Dai", category: "Ao_Dai", price: 1500000, image: "../Product_Picture/Ao_Dai/Type_1.webp" },
    { id: 2, name: "Modern Ao Dai", category: "Ao_Dai", price: 1800000, image: "../Product_Picture/Ao_Dai/Type_2.webp" },
    { id: 3, name: "Floral Ao Dai", category: "Ao_Dai", price: 2000000, image: "../Product_Picture/Ao_Dai/Type_3.webp" },
    { id: 4, name: "Silk Ao Dai", category: "Ao_Dai", price: 2200000, image: "../Product_Picture/Ao_Dai/Type_4.webp" },
    { id: 5, name: "Elegant Ao Dai", category: "Ao_Dai", price: 2500000, image: "../Product_Picture/Ao_Dai/Type_5.webp" },
    { id: 6, name: "Basic T-shirt", category: "T_shirt", price: 300000, image: "../Product_Picture/T_shirt/Type_1.webp" },
    { id: 7, name: "Graphic T-shirt", category: "T_shirt", price: 350000, image: "../Product_Picture/T_shirt/Type_2.webp" },
    { id: 8, name: "Striped T-shirt", category: "T_shirt", price: 400000, image: "../Product_Picture/T_shirt/Type_3.webp" },
    { id: 9, name: "Oversized T-shirt", category: "T_shirt", price: 450000, image: "../Product_Picture/T_shirt/Type_4.webp" },
    { id: 10, name: "V-neck T-shirt", category: "T_shirt", price: 500000, image: "../Product_Picture/T_shirt/Type_5.webp" },
    { id: 11, name: "Summer Dress", category: "Dress", price: 800000, image: "../Product_Picture/Dress/Type_1.webp" },
    { id: 12, name: "Evening Dress", category: "Dress", price: 1200000, image: "../Product_Picture/Dress/Type_2.webp" },
    { id: 13, name: "Floral Dress", category: "Dress", price: 1000000, image: "../Product_Picture/Dress/Type_3.webp" },
    { id: 14, name: "Maxi Dress", category: "Dress", price: 1500000, image: "../Product_Picture/Dress/Type_4.webp" },
    { id: 15, name: "Cocktail Dress", category: "Dress", price: 1800000, image: "../Product_Picture/Dress/Type_5.webp" },
    { id: 16, name: "Denim Jacket", category: "Jacket", price: 900000, image: "../Product_Picture/Jacket/Type_1.webp" },
    { id: 17, name: "Leather Jacket", category: "Jacket", price: 1500000, image: "../Product_Picture/Jacket/Type_2.webp" },
    { id: 18, name: "Bomber Jacket", category: "Jacket", price: 1200000, image: "../Product_Picture/Jacket/Type_3.webp" },
    { id: 19, name: "Windbreaker Jacket", category: "Jacket", price: 1000000, image: "../Product_Picture/Jacket/Type_4.webp" },
    { id: 20, name: "Puffer Jacket", category: "Jacket", price: 1800000, image: "../Product_Picture/Jacket/Type_5.webp" },
    { id: 21, name: "Slim Trousers", category: "Trousers", price: 600000, image: "../Product_Picture/Trousers/Type_1.webp" },
    { id: 22, name: "Wide-leg Trousers", category: "Trousers", price: 750000, image: "../Product_Picture/Trousers/Type_2.webp" },
    { id: 23, name: "Chino Trousers", category: "Trousers", price: 800000, image: "../Product_Picture/Trousers/Type_3.webp" },
    { id: 24, name: "Cargo Trousers", category: "Trousers", price: 900000, image: "../Product_Picture/Trousers/Type_4.webp" },
    { id: 25, name: "Tailored Trousers", category: "Trousers", price: 1000000, image: "../Product_Picture/Trousers/Type_5.webp" },
];

function checkLogin() {
    return localStorage.getItem('loggedIn') === 'true';
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAddress');
    localStorage.removeItem('cart');
    showNotification('You have been logged out!', () => {
        window.location.href = '../HTML/MainPage.html';
    });
}

function addToCart(product) {
    if (!checkLogin()) {
        showNotification('Please login to add products to your cart!', () => {
            window.location.href = '../HTML/Login.html';
        });
        return;
    }
    if (!product || !product.name) {
        showNotification("Error: Product information is missing!");
        return;
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} has been added to your cart!`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }
}

function updateUserStatusLinks() {
    const userStatusLink = document.getElementById('user-status');
    const logoutBtn = document.getElementById('logout-btn');
    const isLoggedIn = checkLogin();

    if (userStatusLink) {
        userStatusLink.textContent = isLoggedIn ? 'Profile' : 'Login | Register';
        userStatusLink.href = isLoggedIn ? '../HTML/Profile.html' : '../HTML/Login.html';
    }
    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? 'inline' : 'none';
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateUserStatusLinks();
    updateCartCount();

    // Products.html - All products with filters
    if (window.location.pathname.includes('Products.html')) {
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        const productList = document.getElementById('product-list');

        const displayProducts = (products) => {
            productList.innerHTML = '';
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/150x150?text=Placeholder'">
                    <h4>${product.name}</h4>
                    <p>${product.price.toLocaleString('en-US')} VND</p>
                    <button class="action-btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
                `;
                productList.appendChild(productItem);
            });
        };

        let filteredProducts = [...allProducts];
        const updateDisplay = () => {
            let products = [...filteredProducts];
            const category = categoryFilter.value;
            if (category !== 'all') products = products.filter(p => p.category === category);
            const sort = sortFilter.value;
            if (sort === 'low-to-high') products.sort((a, b) => a.price - b.price);
            else if (sort === 'high-to-low') products.sort((a, b) => b.price - a.price);
            displayProducts(products);
        };

        updateDisplay();
        categoryFilter.addEventListener('change', updateDisplay);
        sortFilter.addEventListener('change', updateDisplay);
    }

    // Profile.html - Display and edit user info
    if (window.location.pathname.includes('Profile.html')) {
        if (!checkLogin()) {
            showNotification('Please login to view your profile!', () => {
                window.location.href = '../HTML/Login.html';
            });
            return;
        }

        // Display user info
        const infoEmail = document.getElementById('info-email');
        const infoName = document.getElementById('info-name');
        const infoPhone = document.getElementById('info-phone');
        const infoAddress = document.getElementById('info-address');

        infoEmail.textContent = localStorage.getItem('currentEmail') || 'N/A';
        infoName.textContent = localStorage.getItem('userName') || 'N/A';
        infoPhone.textContent = localStorage.getItem('userPhone') || 'N/A';
        infoAddress.textContent = localStorage.getItem('userAddress') || 'N/A';

        // Populate edit form with current info
        const editName = document.getElementById('edit-name');
        const editPhone = document.getElementById('edit-phone');
        const editAddress = document.getElementById('edit-address');

        editName.value = localStorage.getItem('userName') || '';
        editPhone.value = localStorage.getItem('userPhone') || '';
        editAddress.value = localStorage.getItem('userAddress') || '';

        // Handle edit form submission
        const infoForm = document.getElementById('info-form');
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = editName.value.trim();
            const newPhone = editPhone.value.trim();
            const newAddress = editAddress.value.trim();

            if (newName) localStorage.setItem('userName', newName);
            if (newPhone) localStorage.setItem('userPhone', newPhone);
            if (newAddress) localStorage.setItem('userAddress', newAddress);

            infoName.textContent = newName || 'N/A';
            infoPhone.textContent = newPhone || 'N/A';
            infoAddress.textContent = newAddress || 'N/A';

            showNotification('Information updated successfully!');
        });

        // Handle cancel button
        const cancelBtn = document.getElementById('cancel-btn');
        cancelBtn.addEventListener('click', () => {
            editName.value = localStorage.getItem('userName') || '';
            editPhone.value = localStorage.getItem('userPhone') || '';
            editAddress.value = localStorage.getItem('userAddress') || '';
        });

        // Handle change password form (basic validation)
        const passwordForm = document.getElementById('password-form');
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();

            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('Please fill in all fields!');
                return;
            }

            if (newPassword.length < 6) {
                showNotification('New password must be at least 6 characters!');
                return;
            }

            if (newPassword !== confirmPassword) {
                showNotification('New password and confirm password do not match!');
                return;
            }

            // Giả lập đổi mật khẩu thành công
            showNotification('Password changed successfully!');
            passwordForm.reset();
        });

        // Handle logout button in logout-section
        const logoutSectionBtn = document.getElementById('logout-section-btn');
        logoutSectionBtn.addEventListener('click', logout);
    }

    // ContactUs.html - Handle form submission
    if (window.location.pathname.includes('ContactUs.html')) {
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully!');
            contactForm.reset();
        });
    }
});
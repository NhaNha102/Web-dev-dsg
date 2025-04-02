// MainPage.js
function displayFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
        console.error('Product grid not found in MainPage.html');
        return;
    }

    console.log("Displaying featured products...");
    console.log("allProducts:", allProducts);
    productGrid.innerHTML = '';

    // Chọn 8 sản phẩm nổi bật
    const featuredProducts = [
        allProducts.find(p => p.category === 'Ao_Dai' && p.name === 'Traditional Ao Dai'), // Ao_Dai 1
        allProducts.find(p => p.category === 'Ao_Dai' && p.name === 'Modern Ao Dai'),      // Ao_Dai 2
        allProducts.find(p => p.category === 'T_shirt' && p.name === 'Basic T-shirt'),     // T_shirt 1
        allProducts.find(p => p.category === 'T_shirt' && p.name === 'Graphic T-shirt'),   // T_shirt 2
        allProducts.find(p => p.category === 'Dress' && p.name === 'Summer Dress'),        // Dress 1
        allProducts.find(p => p.category === 'Dress' && p.name === 'Evening Dress'),       // Dress 2
        allProducts.find(p => p.category === 'Jacket' && p.name === 'Denim Jacket'),       // Jacket
        allProducts.find(p => p.category === 'Trousers' && p.name === 'Slim Trousers'),    // Trousers
    ].filter(product => product); // Lọc bỏ undefined (nếu có)

    console.log("Featured products:", featuredProducts);
    if (featuredProducts.length === 0) {
        console.error("No featured products found!");
        productGrid.innerHTML = "<p>No featured products available.</p>";
        return;
    }

    featuredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/150x150?text=Placeholder'">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString('en-US')} VND</p>
            <button class="action-btn" onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button>
        `;
        productGrid.appendChild(productDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('MainPage.html')) {
        displayFeaturedProducts();
    }
});

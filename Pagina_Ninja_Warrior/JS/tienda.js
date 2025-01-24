document.addEventListener("DOMContentLoaded", () => {
    const cartModal = document.getElementById("cart-modal");
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    const closeCartButton = document.getElementById("close-cart");

    let cart = [];

    // Actualizar el carrito en el modal
    function updateCart() {
        const cartTableBody = document.querySelector(".cart-items tbody");
        cartTableBody.innerHTML = ""; // Limpiar el contenido actual
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="item-name">${item.name}</td>
            <td>${item.quantity}</td>
            <td class="item-price">$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="remove-item" data-index="${index}">Quitar</button>
            </td>
        `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Añadir eventos a botones de quitar
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", removeItemFromCart);
        });
    }

    // Añadir producto al carrito
    function addToCart(event) {
        const button = event.target.closest(".add-to-cart");
        if (!button) return;

        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        console.log(`Producto añadido: ${name}, Precio: ${price}`); // Depuración
        updateCart();
        cartModal.classList.remove("hidden");
    }

    // Quitar producto del carrito
    function removeItemFromCart(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        updateCart();

        if (cart.length === 0) {
            cartModal.classList.add("hidden");
        }
    }

    // Cerrar el modal del carrito
    closeCartButton.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    // Delegar eventos de clic en los botones de añadir al carrito
    document.querySelector(".card-container").addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart") || event.target.closest(".add-to-cart")) {
            addToCart(event);
        }
    });
});
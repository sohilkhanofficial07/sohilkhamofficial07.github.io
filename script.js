/* =====================================
   SOHIL MARBLE
   Website JavaScript
===================================== */


/* CART */

let cart = [];

let selectedCategory = "all";


/* ADD TO CART */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    showToast(name + " added to enquiry cart");

}


/* UPDATE CART */

function updateCart() {

    const cartCount = document.getElementById("cartCount");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;


    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        document.getElementById("cartTotal").textContent = "₹0";

        return;
    }


    let total = 0;

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        ₹${item.price} / sq.ft.
                        × ${item.quantity}
                    </p>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");

}


/* REMOVE FROM CART */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


/* CLOSE CART BY CLICKING OUTSIDE */

function closeCartOutside(event) {

    if (event.target.id === "cartOverlay") {

        closeCart();

    }

}


/* SEND WHATSAPP ENQUIRY */

function sendWhatsApp() {

    if (cart.length === 0) {

        showToast("Please add a product first");

        return;
    }


    let message =
        "Hello Sohil Khan,%0A%0A" +
        "I am interested in these products from Sohil Marble:%0A%0A";


    let total = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        message +=
            `${index + 1}. ${item.name}%0A` +
            `Price: ₹${item.price}/sq.ft.%0A` +
            `Quantity: ${item.quantity}%0A` +
            `Estimated: ₹${itemTotal}%0A%0A`;

    });


    message +=
        `Estimated Total: ₹${total}%0A%0A` +
        "Please share availability and final quotation.";


    const whatsappNumber = "919116007402";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* TOAST */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* CATEGORY FILTER */

function filterCategory(category, button) {

    selectedCategory = category;


    document
        .querySelectorAll(".filter")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    filterProducts();

}


/* SEARCH + CATEGORY */

function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        const categories =
            product.dataset.category.toLowerCase();


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            selectedCategory === "all" ||
            categories.includes(selectedCategory);


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* MOBILE MENU */

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("show");

}


/* CLOSE MOBILE MENU AFTER CLICK */

document
    .querySelectorAll("#navMenu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .getElementById("navMenu")
                .classList.remove("show");

        });

    });


/* INITIAL CART */

updateCart();

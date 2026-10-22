"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

    /* ── Helpers ──────────────────────────────────────────────── */

    const money = value => new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);

    const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

    const icon = name => {
        const paths = {
            cart: '<path d="M2 3h2l2.4 12h10.8l2-8H5"/><circle cx="8" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
            close: '<path d="m18 6-12 12M6 6l12 12"/>',
            heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
            eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
            plus: '<path d="M12 5v14M5 12h14"/>',
            minus: '<path d="M5 12h14"/>',
            arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
            check: '<path d="m5 12 4 4L19 6"/>'
        };

        return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.check}</svg>`;
    };

    /* ── Product Data ─────────────────────────────────────────── */

    const products = [
        { id: 1, name: "Apple iPhone 16 Pro", category: "smartphones", price: 389999, oldPrice: 419999, rating: 4.9, reviews: 128, badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=85", description: "A premium smartphone with an advanced camera system, powerful performance and a stunning display." },
        { id: 2, name: "Sony WH-1000XM5", category: "audio", price: 84999, oldPrice: 99999, rating: 4.8, reviews: 96, badge: "SALE", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=85", description: "Experience immersive listening with comfortable over-ear headphones and advanced noise cancellation." },
        { id: 3, name: "Apple MacBook Air", category: "laptops", price: 299999, oldPrice: 319999, rating: 4.9, reviews: 84, badge: "POPULAR", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=85", description: "A lightweight laptop built for productivity, creativity and everyday computing." },
        { id: 4, name: "Samsung Galaxy Watch", category: "wearables", price: 59999, oldPrice: 69999, rating: 4.6, reviews: 72, badge: "NEW", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85", description: "A versatile smartwatch for notifications, activity tracking and everyday convenience." },
        { id: 5, name: "Apple AirPods Pro", category: "audio", price: 69999, oldPrice: 79999, rating: 4.8, reviews: 112, badge: "TRENDING", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85", description: "Compact wireless earbuds designed for clear calls, quality sound and comfortable listening." },
        { id: 6, name: "Canon Mirrorless Camera", category: "cameras", price: 229999, oldPrice: 249999, rating: 4.7, reviews: 53, badge: "SALE", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85", description: "Capture everyday moments and creative projects with a versatile digital camera." },
        { id: 7, name: "Premium Gaming Laptop", category: "laptops", price: 349999, oldPrice: 379999, rating: 4.8, reviews: 68, badge: "GAMING", image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=85", description: "A performance-focused laptop for gaming, multitasking and demanding applications." },
        { id: 8, name: "Portable Bluetooth Speaker", category: "audio", price: 18999, oldPrice: 22999, rating: 4.5, reviews: 47, badge: "VALUE", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=85", description: "Take your music anywhere with a compact speaker made for everyday entertainment." },
        { id: 9, name: "Smart Fitness Band", category: "wearables", price: 12999, oldPrice: 15999, rating: 4.4, reviews: 39, badge: "NEW", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=85", description: "A practical wearable for tracking daily activity and checking important notifications." },
        { id: 10, name: "Mirrorless Camera Lens", category: "cameras", price: 54999, oldPrice: 62999, rating: 4.6, reviews: 31, badge: "POPULAR", image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=85", description: "A versatile camera accessory for photographers who want more creative flexibility." },
        { id: 11, name: "Fast Wireless Charger", category: "accessories", price: 4999, oldPrice: 6499, rating: 4.3, reviews: 57, badge: "SALE", image: "https://images.unsplash.com/photo-1591290619762-c588b4d7d4d6?auto=format&fit=crop&w=800&q=85", description: "A convenient charging accessory for a compatible wireless-charging device." },
        { id: 12, name: "USB-C Power Bank", category: "accessories", price: 7999, oldPrice: 9999, rating: 4.5, reviews: 64, badge: "ESSENTIAL", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=85", description: "Keep compatible devices powered while travelling, commuting or working away from home." }
    ];

    /* ── Application State ────────────────────────────────────── */

    const state = {
        cart: [],
        wishlist: new Set(),
        category: "all",
        search: "",
        sort: "featured",
        visibleCount: 12,
        activeProduct: null,
        modalQuantity: 1,
        mobileMenuOpen: false
    };

    /* ── DOM References ───────────────────────────────────────── */

    let productGrid = document.getElementById("productGrid");
    const productSection = $(".products-section, #products");
    const announcement = $(".announcement-bar");
    const overlay = $("#overlay");

    /* ── Storage Helpers ──────────────────────────────────────── */

    function getStored(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    }

    function saveStored(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    }

    /* ── Utility ──────────────────────────────────────────────── */

    function normalize(value) {
        return String(value || "").trim().toLowerCase();
    }

    function getProduct(id) {
        return products.find(product => product.id === Number(id));
    }

    /* ── Product Card Template ────────────────────────────────── */

    function productCard(product) {
        const wished = state.wishlist.has(product.id);

        return `
        <article class="product-card" data-product-id="${product.id}" data-category="${escapeHTML(product.category)}">
            <div class="product-image-wrap product-image">
                <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy">
                ${product.badge ? `<span class="product-badge badge">${escapeHTML(product.badge)}</span>` : ""}
                <button type="button" class="product-wishlist wishlist-btn ${wished ? "active" : ""}" data-wishlist="${product.id}" aria-label="${wished ? "Remove from wishlist" : "Add to wishlist"}" aria-pressed="${wished}">
                    ${icon("heart")}
                </button>
                <button type="button" class="product-quick-view quick-view-btn" data-quick-view="${product.id}">
                    ${icon("eye")} Quick view
                </button>
            </div>
            <div class="product-info">
                <p class="product-category">${escapeHTML(product.category)}</p>
                <h3 class="product-name">${escapeHTML(product.name)}</h3>
                <div class="product-rating"><span class="rating-stars">★★★★★</span> <span>${product.rating} (${product.reviews})</span></div>
                <div class="product-price-row">
                    <strong class="product-price">${money(product.price)}</strong>
                    ${product.oldPrice ? `<del class="product-old-price">${money(product.oldPrice)}</del>` : ""}
                </div>
                <button type="button" class="add-to-cart add-cart-btn btn btn-primary" data-add-to-cart="${product.id}">
                    ${icon("cart")} Add to cart
                </button>
            </div>
        </article>`;
    }

    /* ── Product Grid Rendering ───────────────────────────────── */

    function getVisibleProducts() {
        let result = products.filter(product => {
            const category = normalize(state.category);

            const categoryMatches =
                category === "all" ||
                normalize(product.category) === category ||
                (
                    category === "gaming" &&
                    (
                        /gaming/i.test(product.name) ||
                        normalize(product.badge) === "gaming"
                    )
                );

            const query = normalize(state.search);

            const searchMatches =
                !query ||
                normalize(product.name).includes(query) ||
                normalize(product.category).includes(query) ||
                normalize(product.description).includes(query);

            return categoryMatches && searchMatches;
        });

        if (state.sort === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (state.sort === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (state.sort === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        } else if (state.sort === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }

    function renderProducts() {
        if (!productGrid) {
            productGrid = document.getElementById("productGrid");
        }
        if (!productGrid) return;

        const result = getVisibleProducts();

        productGrid.innerHTML = result
            .slice(0, state.visibleCount)
            .map(productCard)
            .join("");

        // Re-create Lucide icons inside dynamically rendered content
        refreshIcons();

        const count = $("#productResultsCount");
        if (count) {
            count.textContent = `${result.length} product${result.length === 1 ? "" : "s"} found`;
        }

        const empty = $("#emptyState");
        if (empty) {
            empty.hidden = result.length > 0;
        }

        const showAll = $("#showAllProducts");
        if (showAll) {
            showAll.hidden = state.visibleCount >= result.length;
        }
    }

    /* ── Toast Notifications ──────────────────────────────────── */

    function showToast(message, type = "success") {
        let container = $(".toast-container");

        if (!container) {
            container = document.createElement("div");
            container.className = "toast-container";
            container.setAttribute("aria-live", "polite");
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast notification ${type}`;

        const messageSpan = document.createElement("span");
        messageSpan.textContent = message;

        const iconSpan = document.createElement("span");
        iconSpan.innerHTML = type === "error" ? icon("close") : icon("check");

        const close = document.createElement("button");
        close.type = "button";
        close.setAttribute("aria-label", "Dismiss notification");
        close.innerHTML = icon("close");
        close.addEventListener("click", () => toast.remove());

        toast.append(iconSpan, messageSpan, close);
        container.appendChild(toast);
        toast.style.pointerEvents = "auto";

        window.setTimeout(() => toast.remove(), 3200);
    }

    /* ── Cart Count Sync ──────────────────────────────────────── */

    function syncCartCount() {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

        $$("#cartCount, .cart-count, .cart-badge, [data-cart-count]").forEach(el => {
            el.textContent = totalItems;
        });

        const titleCount = $("#cartTitleCount");
        if (titleCount) {
            titleCount.textContent = `(${totalItems})`;
        }
    }

    /* ── Wishlist Count Sync ──────────────────────────────────── */

    function syncWishlistCount() {
        $$("#wishlistCount, [data-wishlist-count], .wishlist-count").forEach(el => {
            el.textContent = state.wishlist.size;
        });
    }

    /* ── Cart Operations ─────────────────────────────────────── */

    function addToCart(id, quantity = 1) {
        const product = getProduct(id);

        if (!product) {
            showToast("This product is not available.", "error");
            return;
        }

        const existing = state.cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity = Math.min(99, existing.quantity + quantity);
        } else {
            state.cart.push({ ...product, quantity: Math.min(99, quantity) });
        }

        saveStored("electronicsStoreCart", state.cart);
        syncCartCount();
        renderCart();
        showToast(`${product.name} added to your cart.`);
    }

    function changeQuantity(id, delta) {
        const item = state.cart.find(product => product.id === Number(id));
        if (!item) return;

        item.quantity += delta;

        if (item.quantity <= 0) {
            state.cart = state.cart.filter(product => product.id !== Number(id));
        }

        saveStored("electronicsStoreCart", state.cart);
        syncCartCount();
        renderCart();
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(item => item.id !== Number(id));
        saveStored("electronicsStoreCart", state.cart);
        syncCartCount();
        renderCart();
        showToast("Item removed from cart.");
    }

    function cartTotals() {
        const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal === 0 || subtotal >= 25000 ? 0 : 500;
        return { subtotal, shipping, total: subtotal + shipping };
    }

    /* ── Cart Drawer ─────────────────────────────────────────── */

    const cartDrawer = $("#cartDrawer");

    function renderCart() {
        if (!cartDrawer) return;

        const itemsContainer = $("#cartItems", cartDrawer);
        const totals = cartTotals();

        if (itemsContainer) {
            if (!state.cart.length) {
                itemsContainer.innerHTML = `
                <div class="drawer-empty">
                    <div class="cart-empty-icon">${icon("cart")}</div>
                    <h3>Your cart is empty</h3>
                    <p>Add something you love to get started.</p>
                </div>`;
            } else {
                itemsContainer.innerHTML = state.cart.map(item => `
                <article class="cart-item drawer-item" data-cart-item="${item.id}">
                    <div class="drawer-item-image">
                        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
                    </div>
                    <div class="drawer-item-info">
                        <h4>${escapeHTML(item.name)}</h4>
                        <strong class="drawer-item-price">${money(item.price)}</strong>
                        <div class="quantity-control">
                            <button type="button" data-quantity="${item.id}" data-delta="-1" aria-label="Decrease quantity">${icon("minus")}</button>
                            <span>${item.quantity}</span>
                            <button type="button" data-quantity="${item.id}" data-delta="1" aria-label="Increase quantity">${icon("plus")}</button>
                        </div>
                    </div>
                    <button type="button" class="remove-cart-item remove-item" data-remove-cart="${item.id}" aria-label="Remove item">${icon("close")}</button>
                </article>`).join("");
            }
        }

        // Update footer totals
        const subtotalEl = $("#cartSubtotal", cartDrawer);
        if (subtotalEl) subtotalEl.textContent = money(totals.subtotal);

        // Update checkout modal total
        const checkoutTotal = $("#checkoutTotal");
        if (checkoutTotal) checkoutTotal.textContent = money(totals.total);

        // Show/hide footer based on cart state
        const cartFooter = $("#cartFooter", cartDrawer);
        if (cartFooter) {
            cartFooter.style.display = state.cart.length ? "" : "none";
        }
    }

    function openCart() {
        if (!cartDrawer) return;
        renderCart();
        cartDrawer.classList.add("active", "open");
        cartDrawer.setAttribute("aria-hidden", "false");
        if (overlay) overlay.classList.add("active");
        document.body.classList.add("drawer-open");
        document.body.style.overflow = "hidden";
    }

    function closeCart() {
        if (!cartDrawer) return;

        cartDrawer.classList.remove("active", "open");
        cartDrawer.setAttribute("aria-hidden", "true");
        if (overlay) overlay.classList.remove("active");
        document.body.classList.remove("drawer-open");

        if (!$(".modal.active, .product-modal.active, .account-modal.active")) {
            document.body.style.overflow = "";
        }
    }

    /* ── Wishlist ─────────────────────────────────────────────── */

    function updateWishlistButtons() {
        $$("[data-wishlist], .wishlist-btn[data-wishlist]").forEach(button => {
            const id = Number(button.dataset.wishlist);
            if (!id) return;
            const active = state.wishlist.has(id);

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
            button.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
        });

        syncWishlistCount();
    }

    function toggleWishlist(id) {
        id = Number(id);

        if (state.wishlist.has(id)) {
            state.wishlist.delete(id);
            showToast("Removed from your wishlist.");
        } else {
            state.wishlist.add(id);
            showToast("Added to your wishlist.");
        }

        saveStored("electronicsStoreWishlist", [...state.wishlist]);
        updateWishlistButtons();
        renderWishlist();
    }

    function renderWishlist() {
        const container = $("#wishlistItems");
        if (!container) return;

        const items = products.filter(product => state.wishlist.has(product.id));

        if (items.length) {
            container.innerHTML = items.map(item => `
            <article class="drawer-item" data-wishlist-item="${item.id}">
                <div class="drawer-item-image">
                    <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy">
                </div>
                <div class="drawer-item-info">
                    <h4>${escapeHTML(item.name)}</h4>
                    <strong class="drawer-item-price">${money(item.price)}</strong>
                    <button type="button" class="btn btn-primary add-to-cart" data-add-to-cart="${item.id}" style="margin-top:8px;min-height:34px;font-size:10px;">
                        ${icon("cart")} Add to cart
                    </button>
                </div>
                <div class="wishlist-item-actions">
                    <button type="button" data-remove-wishlist="${item.id}" aria-label="Remove from wishlist">${icon("close")}</button>
                </div>
            </article>`).join("");
        } else {
            container.innerHTML = `
            <div class="drawer-empty">
                ${icon("heart")}
                <h3>Nothing saved yet</h3>
                <p>Tap the heart on a product to save it here.</p>
            </div>`;
        }
    }

    /* ── Wishlist Drawer ──────────────────────────────────────── */

    const wishlistDrawer = $("#wishlistDrawer");

    function openWishlist() {
        if (!wishlistDrawer) return;
        renderWishlist();
        wishlistDrawer.classList.add("active", "open");
        wishlistDrawer.setAttribute("aria-hidden", "false");
        if (overlay) overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeWishlist() {
        if (!wishlistDrawer) return;

        wishlistDrawer.classList.remove("active", "open");
        wishlistDrawer.setAttribute("aria-hidden", "true");
        if (overlay) overlay.classList.remove("active");

        if (!$(".modal.active, .cart-drawer.active")) {
            document.body.style.overflow = "";
        }
    }

    /* ── Product Modal ────────────────────────────────────────── */

    const productModal = $("#productModal");

    function openProductModal(id) {
        const product = getProduct(id);
        if (!product || !productModal) return;

        state.activeProduct = product;
        state.modalQuantity = 1;

        const content = $("#productModalContent", productModal);
        if (!content) return;

        content.innerHTML = `
        <div class="modal-product-image">
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
        </div>
        <div class="modal-product-info">
            <span class="section-kicker">${escapeHTML(product.category)}</span>
            <h2>${escapeHTML(product.name)}</h2>
            <div class="product-rating"><span class="rating-stars">★★★★★</span> <span>${product.rating} (${product.reviews} reviews)</span></div>
            <div class="modal-product-price">
                <strong>${money(product.price)}</strong>
                ${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}
            </div>
            <p>${escapeHTML(product.description)}</p>
            <div class="modal-availability"><span class="availability-dot" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--success);margin-right:7px;"></span> Available in this demo store</div>
            <div class="modal-quantity" style="display:flex;align-items:center;gap:15px;margin-top:18px;">
                <span>Quantity</span>
                <div class="quantity-control">
                    <button type="button" data-modal-quantity="-1" aria-label="Decrease quantity">${icon("minus")}</button>
                    <span data-modal-quantity-value>1</span>
                    <button type="button" data-modal-quantity="1" aria-label="Increase quantity">${icon("plus")}</button>
                </div>
            </div>
            <button type="button" class="btn btn-primary btn-full" data-modal-add style="margin-top:20px;">Add to cart ${icon("cart")}</button>
        </div>`;

        productModal.classList.add("active", "open");
        productModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProductModal() {
        if (!productModal) return;

        productModal.classList.remove("active", "open");
        productModal.setAttribute("aria-hidden", "true");
        state.activeProduct = null;

        if (!$(".account-modal.active, .cart-drawer.active")) {
            document.body.style.overflow = "";
        }
    }

    /* ── Account Modal ────────────────────────────────────────── */

    const accountModal = $("#accountModal");

    function openAccountModal() {
        if (!accountModal) return;
        accountModal.classList.add("active");
        accountModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeAccountModal() {
        if (!accountModal) return;
        accountModal.classList.remove("active");
        accountModal.setAttribute("aria-hidden", "true");

        if (!$(".product-modal.active, .cart-drawer.active")) {
            document.body.style.overflow = "";
        }
    }

    /* ── Checkout Modal ───────────────────────────────────────── */

    const checkoutModal = $("#checkoutModal");

    function openCheckout() {
        if (!state.cart.length) {
            showToast("Add a product to your cart first.", "error");
            return;
        }

        closeCart();

        const totals = cartTotals();
        const checkoutTotal = $("#checkoutTotal");
        if (checkoutTotal) checkoutTotal.textContent = money(totals.total);

        if (checkoutModal) {
            checkoutModal.classList.add("active");
            checkoutModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeCheckoutModal() {
        if (!checkoutModal) return;
        checkoutModal.classList.remove("active");
        checkoutModal.setAttribute("aria-hidden", "true");

        if (!$(".product-modal.active, .cart-drawer.active, .account-modal.active")) {
            document.body.style.overflow = "";
        }
    }

    /* ── Search Setup ─────────────────────────────────────────── */

    function setupSearch() {
        const searchForm = $("#searchForm");
        const searchInput = $("#searchInput");

        if (!searchForm || !searchInput) return;

        searchInput.addEventListener("input", () => {
            state.search = searchInput.value.trim();
            state.visibleCount = 12;
            renderProducts();
        });

        searchForm.addEventListener("submit", event => {
            event.preventDefault();
            state.search = searchInput.value.trim();
            state.visibleCount = 12;
            renderProducts();
            productSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    /* ── Filter & Sort Setup ──────────────────────────────────── */

    function setupFilters() {
        // Filter tabs
        $$("[data-filter], .filter-tab").forEach(button => {
            const category = button.dataset.filter;
            if (!category) return;

            button.addEventListener("click", () => {
                state.category =
                    ["all", "all products"].includes(normalize(category))
                        ? "all"
                        : normalize(category);

                state.visibleCount = 12;

                $$(".filter-tab, [data-filter]").forEach(item => {
                    item.classList.remove("active");
                    item.setAttribute("aria-pressed", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");

                renderProducts();
            });
        });

        // Sort dropdown
        const sortSelect = $("#sortSelect");
        if (sortSelect) {
            sortSelect.addEventListener("change", () => {
                const value = normalize(sortSelect.value);

                if (value.includes("low") || value.includes("ascending")) {
                    state.sort = "price-low";
                } else if (value.includes("high") || value.includes("descending")) {
                    state.sort = "price-high";
                } else if (value.includes("rating") || value.includes("popular")) {
                    state.sort = "rating";
                } else if (value.includes("name") || value.includes("alphabet")) {
                    state.sort = "name";
                } else {
                    state.sort = "featured";
                }

                renderProducts();
            });
        }

        // Clear filters button
        $("#clearFiltersButton")?.addEventListener("click", () => {
            state.category = "all";
            state.search = "";
            state.sort = "featured";
            state.visibleCount = 12;

            const searchInput = $("#searchInput");
            if (searchInput) searchInput.value = "";

            $$(".filter-tab, [data-filter]").forEach(button => {
                const cat = normalize(button.dataset.filter || "");
                const isAll = cat === "all" || cat === "all products";
                button.classList.toggle("active", isAll);
                button.setAttribute("aria-pressed", String(isAll));
            });

            if (sortSelect) sortSelect.value = "featured";

            renderProducts();
        });

        // "Explore All Products" button
        $("#showAllProducts")?.addEventListener("click", () => {
            state.visibleCount += 12;
            renderProducts();
        });
    }

    /* ── Category Cards & Category Links ──────────────────────── */

    function setupCategoryLinks() {
        // Category cards in the categories section
        $$("[data-category]").forEach(card => {
            card.addEventListener("click", () => {
                const category = normalize(card.dataset.category);
                state.category = category;
                state.visibleCount = 12;

                // Update filter tabs to reflect active category
                $$(".filter-tab, [data-filter]").forEach(tab => {
                    const tabCat = normalize(tab.dataset.filter || "");
                    const isMatch = tabCat === category;
                    tab.classList.toggle("active", isMatch);
                    tab.setAttribute("aria-pressed", String(isMatch));
                });

                renderProducts();
                productSection?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });

        // Nav and footer links with data-category-link
        $$("[data-category-link]").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                const category = normalize(link.dataset.categoryLink);
                state.category = category;
                state.visibleCount = 12;

                $$(".filter-tab, [data-filter]").forEach(tab => {
                    const tabCat = normalize(tab.dataset.filter || "");
                    const isMatch = tabCat === category;
                    tab.classList.toggle("active", isMatch);
                    tab.setAttribute("aria-pressed", String(isMatch));
                });

                renderProducts();
                productSection?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    /* ── Mobile Menu ──────────────────────────────────────────── */

    function setupMobileMenu() {
        const nav = $(".main-nav");
        const toggle = $(".mobile-menu-toggle, #mobileMenuToggle");

        if (!toggle || !nav) return;

        toggle.setAttribute("aria-expanded", "false");

        toggle.addEventListener("click", () => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
            nav.classList.toggle("active", state.mobileMenuOpen);
            toggle.classList.toggle("active", state.mobileMenuOpen);
            toggle.setAttribute("aria-expanded", String(state.mobileMenuOpen));
            toggle.setAttribute("aria-label", state.mobileMenuOpen ? "Close navigation menu" : "Open navigation menu");
            document.body.classList.toggle("menu-open", state.mobileMenuOpen);
        });

        $$("a", nav).forEach(link => {
            link.addEventListener("click", () => {
                state.mobileMenuOpen = false;
                nav.classList.remove("active");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });

        document.addEventListener("click", event => {
            if (state.mobileMenuOpen && !nav.contains(event.target) && !toggle.contains(event.target)) {
                state.mobileMenuOpen = false;
                nav.classList.remove("active");
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });
    }

    /* ── Newsletter ───────────────────────────────────────────── */

    function setupNewsletter() {
        const form = $("#newsletterForm");
        if (!form) return;

        form.addEventListener("submit", event => {
            event.preventDefault();

            const emailInput = $("#newsletterEmail", form);
            const feedback = $("#newsletterMessage", form);

            if (!emailInput || !emailInput.checkValidity()) {
                emailInput?.reportValidity();
                return;
            }

            const email = emailInput.value.trim().toLowerCase();
            const subscriptions = getStored("electronicsStoreSubscribers", []);

            if (subscriptions.includes(email)) {
                if (feedback) feedback.textContent = "This email is already subscribed.";
                else showToast("This email is already subscribed.", "error");
                return;
            }

            subscriptions.push(email);

            if (!saveStored("electronicsStoreSubscribers", subscriptions)) {
                showToast("Could not save your subscription in this browser.", "error");
                return;
            }

            if (feedback) feedback.textContent = "Thank you for subscribing to our demo newsletter.";
            else showToast("Thanks for subscribing.");

            form.reset();
        });
    }

    /* ── Announcement Bar ─────────────────────────────────────── */

    function setupAnnouncement() {
        const closeButton = $(".announcement-close");
        closeButton?.addEventListener("click", () => {
            announcement?.remove();
        });
    }

    /* ── Back to Top ──────────────────────────────────────────── */

    function setupBackToTop() {
        const button = $(".back-to-top, #backToTop");
        if (!button) return;

        const update = () => button.classList.toggle("visible", window.scrollY > 450);

        window.addEventListener("scroll", update, { passive: true });
        update();

        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ── Scroll Animations ────────────────────────────────────── */

    function setupScrollAnimations() {
        const targets = $$("[data-reveal], .reveal, .fade-in, .animate-on-scroll");

        if (!("IntersectionObserver" in window)) {
            targets.forEach(element => element.classList.add("visible", "is-visible"));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible", "is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        targets.forEach(element => observer.observe(element));
    }

    /* ── Loader ───────────────────────────────────────────────── */

    function setupLoader() {
        const loader = $(".loader, #loader");

        if (!loader) {
            document.body.classList.add("page-ready");
            return;
        }

        const hideLoader = () => {
            loader.classList.add("loaded", "hidden");
            document.body.classList.add("page-ready");

            window.setTimeout(() => {
                if (loader.isConnected) loader.style.display = "none";
            }, 500);
        };

        if (document.readyState === "complete") {
            hideLoader();
        } else {
            window.addEventListener("load", hideLoader, { once: true });
            window.setTimeout(hideLoader, 2500);
        }
    }

    /* ── FAQ Accordions ───────────────────────────────────────── */

    function setupAccordions() {
        $$("details").forEach(detail => {
            detail.addEventListener("toggle", () => {
                if (!detail.open || !detail.closest(".faq-list, .faq-section")) return;

                $$("details", detail.parentElement).forEach(other => {
                    if (other !== detail) other.open = false;
                });
            });
        });
    }

    /* ── Product Navigation (smooth scroll) ───────────────────── */

    function setupProductNavigation() {
        $$("a[href^='#']").forEach(link => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            // Skip links that have data-category-link — handled separately
            if (link.hasAttribute("data-category-link")) return;

            link.addEventListener("click", event => {
                let target;

                try {
                    target = $(href);
                } catch {
                    return;
                }

                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", href);
            });
        });
    }

    /* ── Footer Year ──────────────────────────────────────────── */

    function setupFooterYear() {
        $$("#currentYear, [data-current-year], .current-year").forEach(element => {
            element.textContent = new Date().getFullYear();
        });
    }

    /* ── Global Click Delegation ──────────────────────────────── */

    function setupGlobalClicks() {
        document.addEventListener("click", event => {
            const target = event.target.closest("button, a, [role='button']");
            if (!target) return;

            // Open cart drawer
            if (
                target.matches(
                    "#cartButton, [data-open-cart], .cart-action, [aria-label='Shopping cart']"
                )
            ) {
                event.preventDefault();
                openCart();
                return;
            }

            // Open wishlist drawer
            if (
                target.matches(
                    "#wishlistButton, [data-open-wishlist], .wishlist-action, [aria-label='Wishlist']"
                )
            ) {
                event.preventDefault();
                openWishlist();
                return;
            }

            // Open account modal
            if (
                target.matches(
                    "#accountButton, .account-action, [aria-label='Account']"
                )
            ) {
                event.preventDefault();
                openAccountModal();
                return;
            }

            // Wishlist toggle on product cards
            if (target.matches("[data-wishlist]")) {
                const card = target.closest(".product-card, [data-product-card]");
                const productId = Number(
                    target.dataset.wishlist ||
                    target.dataset.productId ||
                    card?.dataset.productId
                );

                if (productId && getProduct(productId)) {
                    event.preventDefault();
                    toggleWishlist(productId);
                }
                return;
            }

            // Remove from wishlist in wishlist drawer
            if (target.matches("[data-remove-wishlist]")) {
                const id = Number(target.dataset.removeWishlist);
                if (id) toggleWishlist(id);
                return;
            }

            // Quick view
            if (target.matches("[data-quick-view], .quick-view-btn")) {
                const card = target.closest(".product-card, [data-product-card]");
                const id = Number(target.dataset.quickView || card?.dataset.productId);
                if (id) {
                    event.preventDefault();
                    openProductModal(id);
                }
                return;
            }

            // Add to cart buttons (JS-rendered cards)
            if (target.matches("[data-add-to-cart]")) {
                const id = Number(target.dataset.addToCart);
                if (id) {
                    event.preventDefault();
                    addToCart(id);
                }
                return;
            }

            // Add to cart buttons (original HTML cards with data-product-id)
            if (target.matches(".add-to-cart[data-product-id]")) {
                const id = Number(target.dataset.productId);
                if (id) {
                    event.preventDefault();
                    addToCart(id);
                }
                return;
            }

            // Close drawers
            if (target.closest("[data-close-cart], [data-close-drawer]")) {
                closeCart();
                closeWishlist();
                return;
            }

            // Remove from cart
            if (target.matches("[data-remove-cart]")) {
                removeFromCart(target.dataset.removeCart);
                return;
            }

            // Cart quantity controls
            if (target.matches("[data-quantity]")) {
                changeQuantity(target.dataset.quantity, Number(target.dataset.delta));
                return;
            }

            // Checkout button (in cart drawer)
            if (target.matches("#checkoutButton, [data-checkout], .checkout-btn")) {
                event.preventDefault();
                openCheckout();
                return;
            }

            // Finish checkout / back to store
            if (target.matches("#finishCheckout")) {
                event.preventDefault();
                closeCheckoutModal();
                return;
            }

            // Close product modal
            if (target.matches("[data-close-modal]")) {
                closeProductModal();
                closeAccountModal();
                closeCheckoutModal();
                return;
            }

            // Modal quantity controls
            if (target.matches("[data-modal-quantity]")) {
                state.modalQuantity = Math.max(
                    1,
                    Math.min(99, state.modalQuantity + Number(target.dataset.modalQuantity))
                );

                const value = $("[data-modal-quantity-value]");
                if (value) value.textContent = state.modalQuantity;
                return;
            }

            // Modal add to cart
            if (target.matches("[data-modal-add]") && state.activeProduct) {
                addToCart(state.activeProduct.id, state.modalQuantity);
                closeProductModal();
                return;
            }

            // Clear cart
            if (target.matches("[data-clear-cart]")) {
                state.cart = [];
                saveStored("electronicsStoreCart", state.cart);
                syncCartCount();
                renderCart();
                showToast("Your cart has been cleared.");
                return;
            }
        });

        // Overlay click closes drawers and modals
        if (overlay) {
            overlay.addEventListener("click", () => {
                closeCart();
                closeWishlist();
            });
        }

        // Click outside modal closes it
        document.addEventListener("click", event => {
            if (event.target === productModal) closeProductModal();
            if (event.target === accountModal) closeAccountModal();
            if (event.target === checkoutModal) closeCheckoutModal();
        });

        // Escape key closes everything
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeCart();
                closeWishlist();
                closeProductModal();
                closeAccountModal();
                closeCheckoutModal();
            }
        });
    }

    /* ── Restore State from localStorage ──────────────────────── */

    function restoreState() {
        const savedCart = getStored("electronicsStoreCart", []);

        state.cart = Array.isArray(savedCart)
            ? savedCart
                .filter(item => item && Number(item.id) && Number(item.quantity) > 0)
                .map(item => {
                    const product = getProduct(item.id);
                    return product
                        ? { ...product, quantity: Math.min(99, Number(item.quantity) || 1) }
                        : null;
                })
                .filter(Boolean)
            : [];

        const savedWishlist = getStored("electronicsStoreWishlist", []);
        state.wishlist = new Set(
            Array.isArray(savedWishlist)
                ? savedWishlist.map(Number).filter(id => Boolean(getProduct(id)))
                : []
        );

        syncCartCount();
        syncWishlistCount();
    }

    /* ── Lucide Icon Refresh ──────────────────────────────────── */

    function refreshIcons() {
        if (window.lucide) {
            try {
                lucide.createIcons();
            } catch {
                // Silently ignore if icons fail to render
            }
        }
    }

    /* ── Initialize ───────────────────────────────────────────── */

    function init() {
        restoreState();
        renderProducts();
        renderCart();
        renderWishlist();
        updateWishlistButtons();
        setupSearch();
        setupFilters();
        setupCategoryLinks();
        setupMobileMenu();
        setupNewsletter();
        setupAnnouncement();
        setupBackToTop();
        setupScrollAnimations();
        setupLoader();
        setupAccordions();
        setupGlobalClicks();
        setupProductNavigation();
        setupFooterYear();
        refreshIcons();

        document.dispatchEvent(new CustomEvent("electronics-store:ready"));
    }

    init();

});

/* ── Loader Fallback (outside DOMContentLoaded) ───────────── */

(function () {
    function removeLoader() {
        const loader = document.querySelector(
            "#loader, .loader, .page-loader, .preloader, [data-loader]"
        );

        if (!loader) return;

        loader.classList.add("loader-hidden", "hidden");

        setTimeout(() => {
            if (loader.isConnected) {
                loader.style.display = "none";
            }
        }, 500);
    }

    if (document.readyState === "complete") {
        removeLoader();
    } else {
        window.addEventListener("load", removeLoader, { once: true });
    }

    setTimeout(removeLoader, 5000);
})();

/* ── Lucide icons init (outside DOMContentLoaded) ─────────── */

function refreshIcons() {
    if (window.lucide) {
        try {
            lucide.createIcons();
        } catch {
            // silently ignore
        }
    }
}

document.addEventListener("DOMContentLoaded", refreshIcons);

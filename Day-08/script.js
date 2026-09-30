/* =========================================
   INVENTORY MANAGEMENT SYSTEM
========================================= */

// =========================================
// DEFAULT PRODUCTS
// =========================================

const defaultProducts = [

    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 50000,
        stock: 20
    },

    {
        id: 2,
        name: "Mouse",
        category: "Accessories",
        price: 800,
        stock: 50
    },

    {
        id: 3,
        name: "Keyboard",
        category: "Accessories",
        price: 1500,
        stock: 35
    },

    {
        id: 4,
        name: "Monitor",
        category: "Electronics",
        price: 12000,
        stock: 10
    },

    {
        id: 5,
        name: "Printer",
        category: "Electronics",
        price: 15000,
        stock: 5
    },

    {
        id: 6,
        name: "Headphones",
        category: "Accessories",
        price: 2500,
        stock: 8
    },

    {
        id: 7,
        name: "Chair",
        category: "Furniture",
        price: 5000,
        stock: 12
    },

    {
        id: 8,
        name: "Desk",
        category: "Furniture",
        price: 8000,
        stock: 6
    }

];


// =========================================
// LOCAL STORAGE
// =========================================

const STORAGE_KEY = "inventoryProducts";

let products =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || defaultProducts;


const saveProducts = () => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );

};


// =========================================
// PAGE NAVIGATION
// =========================================

const showPage = (pageId) => {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }


    const button =
        document.querySelector(
            `[data-page="${pageId}"]`
        );


    if (button) {

        button.classList.add("active");

    }

};


document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.page
                );

            }
        );

    });


// =========================================
// TOTAL STOCK
// =========================================

const calculateTotalStock = () => {

    return products.reduce(
        (total, product) =>
            total + Number(product.stock),
        0
    );

};


// =========================================
// UPDATE DASHBOARD
// =========================================

const updateDashboard = () => {

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );

    const totalStock =
        document.getElementById(
            "totalStock"
        );

    const totalCategories =
        document.getElementById(
            "totalCategories"
        );

    const totalVendors =
        document.getElementById(
            "totalVendors"
        );


    if (totalProducts) {

        totalProducts.textContent =
            products.length;

    }


    if (totalStock) {

        totalStock.textContent =
            calculateTotalStock();

    }


    if (totalCategories) {

        const categories = [
            ...new Set(
                products.map(
                    product =>
                        product.category
                )
            )
        ];

        totalCategories.textContent =
            categories.length;

    }


    if (totalVendors) {

        totalVendors.textContent = "3";

    }


    displayRecentProducts();

};


// =========================================
// RECENT PRODUCTS
// =========================================

const displayRecentProducts = () => {

    const container =
        document.getElementById(
            "recentProducts"
        );


    if (!container) {
        return;
    }


    const recentProducts =
        products
            .slice(-5)
            .reverse();


    if (
        recentProducts.length === 0
    ) {

        container.innerHTML = `
            <p class="empty-message">
                No products available.
            </p>
        `;

        return;
    }


    container.innerHTML =
        recentProducts
            .map(product => {

                const {
                    name,
                    category,
                    price,
                    stock
                } = product;


                const status =
                    stock < 10
                        ? "Low Stock"
                        : "Available";


                return `

                    <div class="recent-item">

                        <h4>
                            ${name}
                        </h4>

                        <p>
                            ${category}
                        </p>

                        <strong>
                            ₹${price.toLocaleString("en-IN")}
                        </strong>

                        <span>
                            Stock: ${stock}
                        </span>

                        <span class="status ${
                            stock < 10
                                ? "low"
                                : "available"
                        }">

                            ${status}

                        </span>

                    </div>

                `;

            })
            .join("");

};


// =========================================
// DISPLAY PRODUCTS
// =========================================

const displayProducts = (
    productList = products
) => {

    const tableBody =
        document.getElementById(
            "productTableBody"
        );


    if (!tableBody) {
        return;
    }


    if (productList.length === 0) {

        tableBody.innerHTML = `
            <tr>

                <td colspan="6"
                    class="empty-message">

                    No products found.

                </td>

            </tr>
        `;

        return;
    }


    tableBody.innerHTML =
        productList
            .map(product => {

                const {
                    id,
                    name,
                    category,
                    price,
                    stock
                } = product;


                const status =
                    stock < 10
                        ? "Low Stock"
                        : "Available";


                return `

                    <tr>

                        <td>
                            <strong>
                                ${name}
                            </strong>
                        </td>

                        <td>
                            ${category}
                        </td>

                        <td>
                            ₹${price.toLocaleString("en-IN")}
                        </td>

                        <td>
                            ${stock}
                        </td>

                        <td>

                            <span class="status ${
                                stock < 10
                                    ? "low"
                                    : "available"
                            }">

                                ${status}

                            </span>

                        </td>

                        <td class="action-buttons">

                            <button
                                class="view-btn"
                                data-action="view"
                                data-id="${id}">

                                View

                            </button>

                            <button
                                class="edit-btn"
                                data-action="edit"
                                data-id="${id}">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                data-action="delete"
                                data-id="${id}">

                                Delete

                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

};


// =========================================
// ADD PRODUCT
// =========================================

const addProduct = () => {

    const nameInput =
        document.getElementById(
            "productName"
        );

    const categoryInput =
        document.getElementById(
            "productCategory"
        );

    const priceInput =
        document.getElementById(
            "productPrice"
        );

    const stockInput =
        document.getElementById(
            "productStock"
        );


    const name =
        nameInput.value.trim();

    const category =
        categoryInput.value;

    const price =
        Number(priceInput.value);

    const stock =
        Number(stockInput.value);


    if (!name) {

        alert(
            "Please enter product name."
        );

        return;
    }


    if (!category) {

        alert(
            "Please select a category."
        );

        return;
    }


    if (price <= 0) {

        alert(
            "Please enter a valid price."
        );

        return;
    }


    if (
        stock < 0 ||
        stockInput.value === ""
    ) {

        alert(
            "Please enter valid stock."
        );

        return;
    }


    const newProduct = {

        id: Date.now(),

        name,

        category,

        price,

        stock

    };


    products.push(newProduct);


    saveProducts();


    displayProducts();

    updateDashboard();

    updateCategoryCounts();


    nameInput.value = "";

    categoryInput.value = "";

    priceInput.value = "";

    stockInput.value = "";


    alert(
        "Product added successfully!"
    );

};


document
    .getElementById("addProduct")
    ?.addEventListener(
        "click",
        addProduct
    );


// =========================================
// VIEW PRODUCT
// =========================================

const viewProduct = (id) => {

    const product =
        products.find(
            product =>
                product.id ===
                Number(id)
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    const {
        name,
        category,
        price,
        stock
    } = product;


    const status =
        stock < 10
            ? "Low Stock"
            : "Available";


    const details =
        document.getElementById(
            "productDetails"
        );

    const detailsContent =
        document.getElementById(
            "detailsContent"
        );


    detailsContent.innerHTML = `

        <div class="product-detail-card">

            <h2>
                ${name}
            </h2>

            <div class="detail-row">

                <strong>
                    Product Name:
                </strong>

                <span>
                    ${name}
                </span>

            </div>

            <div class="detail-row">

                <strong>
                    Category:
                </strong>

                <span>
                    ${category}
                </span>

            </div>

            <div class="detail-row">

                <strong>
                    Price:
                </strong>

                <span>
                    ₹${price.toLocaleString("en-IN")}
                </span>

            </div>

            <div class="detail-row">

                <strong>
                    Stock:
                </strong>

                <span>
                    ${stock}
                </span>

            </div>

            <div class="detail-row">

                <strong>
                    Status:
                </strong>

                <span class="status ${
                    stock < 10
                        ? "low"
                        : "available"
                }">

                    ${status}

                </span>

            </div>

        </div>

    `;


    details.style.display =
        "block";

};


// =========================================
// EDIT PRODUCT
// =========================================

let editingProductId = null;


const editProduct = (id) => {

    const product =
        products.find(
            product =>
                product.id ===
                Number(id)
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    editingProductId =
        Number(id);


    const {
        name,
        category,
        price,
        stock
    } = product;


    document.getElementById(
        "editName"
    ).value = name;


    document.getElementById(
        "editCategory"
    ).value = category;


    document.getElementById(
        "editPrice"
    ).value = price;


    document.getElementById(
        "editStock"
    ).value = stock;


    document.getElementById(
        "editModal"
    ).style.display = "flex";

};


// =========================================
// SAVE EDIT
// =========================================

const saveEditedProduct = () => {

    if (
        editingProductId === null
    ) {
        return;
    }


    const product =
        products.find(
            product =>
                product.id ===
                editingProductId
        );


    if (!product) {
        return;
    }


    const newName =
        document.getElementById(
            "editName"
        ).value.trim();


    const newCategory =
        document.getElementById(
            "editCategory"
        ).value;


    const newPrice =
        Number(
            document.getElementById(
                "editPrice"
            ).value
        );


    const newStock =
        Number(
            document.getElementById(
                "editStock"
            ).value
        );


    if (!newName) {

        alert(
            "Enter product name."
        );

        return;
    }


    if (newPrice <= 0) {

        alert(
            "Enter valid price."
        );

        return;
    }


    if (newStock < 0) {

        alert(
            "Enter valid stock."
        );

        return;
    }


    // Spread Operator
    const updatedProduct = {

        ...product,

        name: newName,

        category: newCategory,

        price: newPrice,

        stock: newStock

    };


    products =
        products.map(
            product =>
                product.id ===
                editingProductId
                    ? updatedProduct
                    : product
        );


    saveProducts();


    displayProducts();

    updateDashboard();

    updateCategoryCounts();

    applyFilters();


    closeEditModal();


    alert(
        "Product updated successfully!"
    );

};


document
    .getElementById("saveEdit")
    ?.addEventListener(
        "click",
        saveEditedProduct
    );


// =========================================
// DELETE PRODUCT
// =========================================

const deleteProduct = (id) => {

    const product =
        products.find(
            product =>
                product.id ===
                Number(id)
        );


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${product.name}?`
        );


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            product =>
                product.id !==
                Number(id)
        );


    saveProducts();


    displayProducts();

    updateDashboard();

    updateCategoryCounts();

    applyFilters();


    alert(
        "Product deleted successfully!"
    );

};


// =========================================
// TABLE ACTIONS
// =========================================

document
    .getElementById(
        "productTableBody"
    )
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;

            const id =
                button.dataset.id;


            if (action === "view") {

                viewProduct(id);

            }

            else if (
                action === "edit"
            ) {

                editProduct(id);

            }

            else if (
                action === "delete"
            ) {

                deleteProduct(id);

            }

        }
    );


// =========================================
// SEARCH
// =========================================

const searchProducts = () => {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filter =
        statusFilter.value;


    const filtered =
        products.filter(
            product => {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                let matchesFilter =
                    true;


                if (
                    filter ===
                    "available"
                ) {

                    matchesFilter =
                        product.stock >= 10;

                }


                if (
                    filter ===
                    "low"
                ) {

                    matchesFilter =
                        product.stock < 10;

                }


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    displayProducts(
        filtered
    );

};


document
    .getElementById(
        "searchInput"
    )
    ?.addEventListener(
        "input",
        searchProducts
    );


document
    .getElementById(
        "statusFilter"
    )
    ?.addEventListener(
        "change",
        searchProducts
    );


const applyFilters = () => {

    searchProducts();

};


// =========================================
// CLEAR FILTERS
// =========================================

document
    .getElementById(
        "clearFilters"
    )
    ?.addEventListener(
        "click",
        () => {

            document.getElementById(
                "searchInput"
            ).value = "";


            document.getElementById(
                "statusFilter"
            ).value = "all";


            displayProducts(
                products
            );

        }
    );


// =========================================
// CLOSE DETAILS
// =========================================

document
    .getElementById(
        "closeDetails"
    )
    ?.addEventListener(
        "click",
        () => {

            document.getElementById(
                "productDetails"
            ).style.display = "none";

        }
    );


// =========================================
// CLOSE EDIT MODAL
// =========================================

const closeEditModal = () => {

    document.getElementById(
        "editModal"
    ).style.display = "none";


    editingProductId = null;

};


document
    .getElementById(
        "closeModal"
    )
    ?.addEventListener(
        "click",
        closeEditModal
    );


// =========================================
// CATEGORY COUNTS
// =========================================

const updateCategoryCounts = () => {

    const electronics =
        products.filter(
            product =>
                product.category ===
                "Electronics"
        ).length;


    const accessories =
        products.filter(
            product =>
                product.category ===
                "Accessories"
        ).length;


    const furniture =
        products.filter(
            product =>
                product.category ===
                "Furniture"
        ).length;


    document.getElementById(
        "electronicsCount"
    ).textContent =
        electronics;


    document.getElementById(
        "accessoriesCount"
    ).textContent =
        accessories;


    document.getElementById(
        "furnitureCount"
    ).textContent =
        furniture;

};


// =========================================
// CATEGORY PRODUCTS
// =========================================

const showCategoryProducts = (
    category
) => {

    const list =
        document.getElementById(
            "categoryProductList"
        );

    const section =
        document.getElementById(
            "categoryProducts"
        );

    const title =
        document.getElementById(
            "categoryTitle"
        );


    const filtered =
        products.filter(
            product =>
                product.category ===
                category
        );


    title.textContent =
        `${category} Products`;


    list.innerHTML =
        filtered
            .map(product => {

                const {
                    name,
                    price,
                    stock
                } = product;


                const status =
                    stock < 10
                        ? "Low Stock"
                        : "Available";


                return `

                    <div class="category-product">

                        <div>

                            <h4>
                                ${name}
                            </h4>

                            <p>
                                ₹${price.toLocaleString("en-IN")}
                            </p>

                        </div>


                        <div>

                            <span>
                                Stock: ${stock}
                            </span>

                            <span class="status ${
                                stock < 10
                                    ? "low"
                                    : "available"
                            }">

                                ${status}

                            </span>

                        </div>

                    </div>

                `;

            })
            .join("");


    section.style.display =
        "block";

};


document
    .querySelectorAll(
        ".category-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                showCategoryProducts(
                    card.dataset.category
                );

            }
        );

    });


// =========================================
// CLOSE CATEGORY
// =========================================

document
    .getElementById(
        "closeCategory"
    )
    ?.addEventListener(
        "click",
        () => {

            document.getElementById(
                "categoryProducts"
            ).style.display =
                "none";

        }
    );


// =========================================
// INITIALIZE
// =========================================

saveProducts();

displayProducts();

updateDashboard();

updateCategoryCounts();

showPage(
    "dashboardPage"
);
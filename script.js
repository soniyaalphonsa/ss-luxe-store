
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const products = [
  {
    name: "Elegant Dress",
    category: "Clothing",
    price: 799,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500"
  },
  {
    name: "Casual Top",
    category: "Clothing",
    price: 499,
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500"
  },
  {
    name: "Fashion Earrings",
    category: "Jewellery",
    price: 199,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500"
  },
  {
    name: "Gold Necklace",
    category: "Jewellery",
    price: 299,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
  },
  {
    name: "Vintage Shirt",
    category: "Thrift",
    price: 299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    name: "Thrift Outfit",
    category: "Thrift",
    price: 399,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500"
  },
  {
    name: "Beautiful Bracelet",
    category: "Jewellery",
    price: 249,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"
  },
  {
    name: "Party Dress",
    category: "Clothing",
    price: 999,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500"
  }
];

let selectedCategory = "All";
let cart = [];

function displayProducts() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = products.filter(product => {
    return (
      (selectedCategory === "All" ||
       product.category === selectedCategory) &&
      product.name.toLowerCase().includes(search)
    );
  });

  document.getElementById("product-list").innerHTML =
    filtered.map((product, index) => `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p><strong>₹${product.price}</strong></p>
        <button onclick="addToCart(${products.indexOf(product)})">
          Add to Cart
        </button>
      </div>
    `).join("") || "<p>No products found.</p>";
}

function showCategory(category) {
  selectedCategory = category;
  displayProducts();
  document.getElementById("shop").scrollIntoView();
}

function addToCart(index) {
  cart.push(products[index]);
  document.getElementById("cart-count").textContent = cart.length;
  alert("Added to your SS LUXE cart!");
}

function openCart() {
  document.getElementById("cart-modal").style.display = "block";
  const items = document.getElementById("cart-items");

  items.innerHTML = cart.map((product, index) => `
    <div class="cart-row">
      <span>${product.name} - ₹${product.price}</span>
      <button onclick="removeItem(${index})">Remove</button>
    </div>
  `).join("") || "<p>Your cart is empty.</p>";

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  document.getElementById("cart-total").textContent = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").textContent = cart.length;
  openCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please add your WhatsApp number in script.js first.");
    return;
  }

  let message = "Hello SS LUXE! I want to order:\n";

  cart.forEach(product => {
    message += product.name + " - ₹" + product.price + "\n";
  });

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  message += "\nTotal: ₹" + total;

  window.open(
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
}

function contactWhatsApp() {
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please add your WhatsApp number in script.js first.");
    return;
  }

  window.open("https://wa.me/" + WHATSAPP_NUMBER, "_blank");
}

document.getElementById("search").addEventListener("input", displayProducts);

displayProducts();

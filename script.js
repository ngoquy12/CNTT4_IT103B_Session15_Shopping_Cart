// Xác định các dữ liệu quan trọng
const products = [
  { id: 1, name: "Bánh Chưng", price: 150000, img: "/img/banhchung.webp" },
  { id: 2, name: "Giò Lụa", price: 180000, img: "/img/giolua.jpg" },
  { id: 3, name: "Cành Đào", price: 500000, img: "/img/canhdao.webp" },
  { id: 4, name: "Mứt Tết", price: 120000, img: "/img/muttet.webp" },
  { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "/img/lixi.webp" },
  { id: 6, name: "Dưa Hấu", price: 60000, img: "/img/duahau.jpg" },
];

const carts = [
  {
    id: 1,
    product: {
      id: 1,
      name: "Bánh Chưng",
      price: 150000,
      img: "/img/banhchung.webp",
    },
    quantity: 2,
  },
  {
    id: 2,
    product: { id: 6, name: "Dưa Hấu", price: 60000, img: "/img/duahau.jpg" },
    quantity: 1,
  },
];

// Trích xuất các phần tử HTML
const productListElement = document.querySelector("#product-list");
const cartListElement = document.querySelector("#cart-list");

const formatCurrency = (price) => {
  return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

// Render danh sách sản phẩm tết
const renderProducts = (products) => {
  if (Array.isArray(products)) {
    let productCartHtml = "";
    products.forEach((product) => {
      productCartHtml += `
         <div class="product-card">
            <img src=${product.img} alt="" />
            <h3>${product.name}</h3>
            <p class="price">${formatCurrency(product.price)}</p>
            <button class="btn-add" id="btn-add-${product.id}">
              Thêm vào giỏ
            </button>
          </div>
        `;
    });

    // Gắn chuỗi HTML chứa thông tin sản phẩm vào thẻ danh sách
    productListElement.innerHTML = productCartHtml;
  }
};

const renderCarts = (carts) => {
  if (Array.isArray(carts)) {
    // Kiểm tra xem trong giỏ hàng có SP không?
    if (carts.length === 0) {
      cartListElement.innerHTML = `<li class="empty-msg">Chưa có món nào...</li>`;
      return;
    }

    const elementMaps = carts.map((element) => {
      // Trả về chuỗi HTML đại diện từng SP
      return `
        <li>
            <span class="cart-item-name">${element.product.name}</span> ()
            <div>
            <span class="cart-item-price">${formatCurrency(element.product.price)}</span>
            <button class="btn-remove">X</button>
            </div>
        </li>
     `;
    });

    // Chuyển đổi mảng thành chuỗi
    const elementConverted = elementMaps.join("");

    // Dán chuỗi HTML chứa sản phẩm vào danh sách
    cartListElement.innerHTML = elementConverted;
  }
};

renderProducts(products);

renderCarts(carts);

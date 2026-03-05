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
const totalPriceElement = document.querySelector("#total-price");

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
            <button onclick="handleAddToCart(${product.id})" class="btn-add" id="btn-add-${product.id}">
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
      // Reset giá tiền về 0 khi giỏ hàng chưa có sp
      totalPriceElement.textContent = formatCurrency(0);
      cartListElement.innerHTML = `<li class="empty-msg">Chưa có món nào...</li>`;
      return;
    }

    const elementMaps = carts.map((element) => {
      // Trả về chuỗi HTML đại diện từng SP
      return `
        <li>
            <span class="cart-item-name">${element.product.name} (${element.quantity}) </span>
            <button>+</button>
            <button>-</button>
            <div>
            <span class="cart-item-price">${formatCurrency(element.product.price)}</span>
            <button onclick="handleRemoveCart(${element.id})" class="btn-remove">X</button>
            </div>
        </li>
     `;
    });

    // Tính tổng tiền của giỏ hàng
    totalPriceElement.textContent = formatCurrency(caculatorTotal(carts));

    // Chuyển đổi mảng thành chuỗi
    const elementConverted = elementMaps.join("");

    // Dán chuỗi HTML chứa sản phẩm vào danh sách
    cartListElement.innerHTML = elementConverted;
  }
};

const caculatorTotal = (carts) => {
  if (Array.isArray(carts)) {
    const result = carts.reduce((prev, current) => {
      console.log("prev: ", prev);
      console.log("current: ", current);

      return prev + current.product.price * current.quantity;
    }, 0);

    return result;
  }
};

const handleAddToCart = (id) => {
  // Kiểm tra xem trong giỏ hàng đã có sp chưa?
  const productIndexOfCart = carts.findIndex((cart) => cart.product.id === id);

  // Nếu sản phẩm chưa có thì tiến hành thêm vào
  if (productIndexOfCart === -1) {
    // 1. Tìm kiếm thông tin sản phẩm theo id
    const findProduct = products.find((product) => product.id === id);

    // 2. Kiểm tra điều kiện
    if (findProduct) {
      // Nếu tìm thấy
      // + Thêm sản phẩm vào giỏ hàng
      const newCart = {
        id: carts.length + 1,
        product: findProduct,
        quantity: 1,
      };

      // Push sản phẩm vào giỏ hàng
      carts.push(newCart);

      // + Gọi hàm renderCarts để làm mới giao dịch
      renderCarts(carts);
    } else {
    }
  } else {
    // Nếu đã có thì tiến hành tăng quantity lên 1
    // Truy cập vào quantity của sản phẩm trong giỏ hàng

    carts[productIndexOfCart].quantity += 1;

    // + Gọi hàm renderCarts để làm mới giao dịch
    renderCarts(carts);
  }
};

const handleRemoveCart = (id) => {
  // Tìm kiếm cart theo id
  const productRemoveIndex = carts.findIndex((cart) => cart.id === id);

  // Nếu tìm thấy
  if (productRemoveIndex !== -1) {
    // + Xóa theo vị trí
    carts.splice(productRemoveIndex, 1);

    // + Gọi hàm để render lại danh sách
    renderCarts(carts);
  } else {
    // Nếu không tìm thấy
    alert("Không tìm thấy thông tin");
  }
};

// Hàm tắng số lượng sản phẩm trong giỏ hàng
const handleIncreasement = () => {};

const handleDecreaaement = () => {};

renderProducts(products);

renderCarts(carts);

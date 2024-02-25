import { footer } from "./modu.js";
footer();
//product data
// var c = location.searchParams.get();
// var productId = window.location.search.split("?")[1].split("=")[1];
const productId = new URL(window.location).searchParams.get("id");

// let productData = async function (url) {
//   let product;
//   await fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       product = data;
//       product = product.filter((e) => e.product_id == productId)[0];
//       type.innerHTML = `${product.categoryName}`;
//       price.innerHTML = `${product.price}<span>&ensp;Kyats</span>`;

//       description.innerHTML = product.decription;
//       productName.innerHTML = product.name;
//       sessionStorage.setItem("product", JSON.stringify(product));
//       subcal(product.price);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   //qty cal
//   btn.forEach((btn) =>
//     btn.addEventListener("click", () => subcal(product.price))
//   );
//   document
//     .querySelector(".q-value")
//     .addEventListener("change", () => subcal(product.price));
//   // productimg
//   let image = product.image.split(",");
//   let r = "";
//   image.forEach((img, index) => {
//     r += `<img src="http://localhost:8000/storage/image/${img}" alt="" >`;
//   });
//   productImg.innerHTML = r;
//   big.innerHTML = r;
//   productImg.firstChild.dataset.active = true;
//   big.firstChild.dataset.active = true;
//   //
//   //active image
//   const imgBig = document.querySelector("[data-big]");
//   const imgSmallAll = document.querySelectorAll("[data-small] img");
//   const imgSmall = document.querySelector("[data-small]");
//   imgSmallAll.forEach((small) => {
//     small.addEventListener("click", () => {
//       const imgSmallActive = document.querySelector(
//         "[data-small] [data-active]"
//       );
//       const imgBigActive = document.querySelector("[data-big] [data-active]");
//       index = [...imgSmall.children].indexOf(small);
//       if (small != imgSmallActive) {
//         small.dataset.active = true;
//         delete imgSmallActive.dataset.active;
//         //big img
//         imgBig.children[index].dataset.active = true;
//         delete imgBigActive.dataset.active;
//       }
//     });
//   });

//   return product;
// };
// async function productData(url) {
//   await fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       sessionStorage.setItem("productList", JSON.stringify(data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
// productData("http://localhost:8000/api/item");

// async function categoryData(url) {
//   let res = await fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       sessionStorage.setItem("category", JSON.stringify(data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
var productList = JSON.parse(sessionStorage.getItem("productList"));
const categoryDada = JSON.parse(sessionStorage.getItem("category"));
var product = productList.find((item) => item.product_id == productId);
var productImage = product.image.split(",");
var imageHtml = document.querySelector("[product-img]");
var imgChild = [].slice.call(imageHtml.children);

imgChild.forEach((element) => {
  var imgChidImage = "";
  productImage.forEach((img, index) => {
    if (index == 0) {
      imgChidImage += `<img src="http://localhost:8000/storage/image/${img}" alt="" data-active>`;
    } else {
      imgChidImage += `<img src="http://localhost:8000/storage/image/${img}" alt="" >`;
    }
  });
  element.innerHTML = imgChidImage;
});
var imgBig = document.querySelectorAll("[data-big] img");
var imgSmall = document.querySelectorAll("[data-small] img");

imgSmall.forEach((imgSm, index) => {
  imgSm.addEventListener("click", () => {
    var imgSmallActive = document.querySelector("[data-small] [data-active]");
    var imgBigActive = document.querySelector("[data-big] [data-active]");
    delete imgSmallActive.dataset.active;
    delete imgBigActive.dataset.active;
    imgSm.dataset.active = true;
    imgBig[index].dataset.active = true;
  });
});

const article = document.querySelector("[product-article]");
console.log(product);
article.innerHTML = `<div class="product-name">${product.name}</div>
                <div class="product-rating">&#9733;&#9733;&#9733;&#9733;&#x2606;</div>
                <div class="product-description">${product.decription}</div>
                <div class="details" details>
                   
                </div>
                <div class="product-btn" addcart-btn> 
                    <button><img src="/image/icon/cart-plus.png" alt=""> Add to Cart </button>
                    <button>Buy it Now</button>
                </div>`;

const productDetails = article.querySelector("[details]");
//color option
const color = product.color.split(",");
const categoryColor = categoryDada.color;
var colorHtml = "";
color.forEach((c, index) => {
  var cc = categoryColor.find((e) => e.name == c);
  var rr = "";

  if (c == "Mixed") {
    rr += `<label for="${cc.color_code}" style="display:grid;grid-template-columns: 50% 50%;" title="">
                                            <div style="width:100%;height:100%;background-color:#FF85A2;border-radius:100% 0px 0 0%">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#FFE300;border-radius:0 100% 0px 0">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#5A86AD;border-radius: 0px 0 0% 100%">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#FFF9EC;border-radius:0 0% 100% 0px">
                                            </div> </label> `;
  } else {
    rr += `
                                <label for="${cc.color_code}" style="background-color: ${cc.color_code};"> </label>
                           `;
  }
  if (index == 0) {
    colorHtml += `<span class="">
                                <input type="radio" name="color" id="${cc.color_code}" class="color-radio" value="${c}" checked>
                               ${rr}
                            </span>`;
  } else {
    colorHtml += `<span class="">
                                <input type="radio" name="color" id="${cc.color_code}" class="color-radio" value="${c}">
                                ${rr}
                            </span>`;
  }
});

productDetails.innerHTML = ` <div class="price">
                        <div>price&ensp;:</div>
                        <div class="price-js"> ${product.price}<span>&ensp;Kyats</span></div>
                    </div>
                   <div class="color" color>
                   <div>Color*</div>
                        <div class="color-check">
                           ${colorHtml}
                        </div>
                    </div>
                   </div>
                    <div class="size">
                        <div>Size*</div>
                        <div class="size-radio">
                            <span class="">
                                <input type="radio" name="size" id="size1" class="size-radio" value="S" checked>
                                <label for="size1">Standard</label>
                            </span>
                            <span class="">
                                <input type="radio" name="size" id="size2" class="size-radio" value="D">
                                <label for="size2">Deluxe</label>
                            </span>
                            <span class=""> <input type="radio" name="size" id="size3" class="size-radio" value="P">
                                <label for="size3">Premium</label>

                            </span>
                        </div>
                    </div>
                    <div class="type">
                        <div>Product type&ensp;:</div>
                        <div class="product-type">${product.groupName}</div>
                    </div>
                    <div class="availabilty">
                        <div>Availability&ensp;:</div>
                        <div>Available</div>
                    </div>
                    <div class="quantity">
                        <div>Quantity&ensp;:</div>
                        <div class="quantity-c">
                            <button
                            class="minus">&#8722;</button>
                            <input class="q-value" name="quantity" min='1' value="1" type="number">
                            <button "
                                class="plus">&#43;</button>

                        </div>
                    </div>
                    <div class="sub-total">
                        <div>Subtotal&ensp;: </div>
                        <div class="cal-sub" cal-sub>30000kyats</div>
                    </div>`;

// onclick="document.querySelector('.quantity input[type=number]').stepUp()
const priceBtn = productDetails.querySelectorAll(".quantity-c button");
const qValue = productDetails.querySelector(".q-value");
priceBtn.forEach((b) => {
  b.addEventListener("click", () => {
    if (b.classList == "plus") {
      qValue.stepUp();
    } else if (b.classList == "minus") {
      qValue.stepDown();
    }
    subTotalFunc(qValue.value);
  });
});

qValue.addEventListener("change", () => {
  subTotalFunc(qValue.value);
});

const subTotal = productDetails.querySelector("[cal-sub]");
const subTotalFunc = (qval = 1) => {
  subTotal.innerHTML = product.price * qval + "kyats";
};
subTotalFunc();

import { addToCart } from "./modu.js";

const addToCartBtn = article.querySelector("[addcart-btn]");
addToCartBtn.addEventListener("click", () => {
  var selectedColor = productDetails.querySelector(
    ".color-check input:checked"
  ).value;
  var size = productDetails.querySelector(".size-radio input:checked").value;
  addToCart(productId, selectedColor, qValue.value, size);
  cartCount();
});
// const colorOpt = productDetails.querySelector("[color]");

// colorOpt.innerHTML = `
//                         <div>Color*</div>
//                         <div class="color-check">
//                            ${colorHtml}
//                         </div>
//                     </div>`;
// const price = document.querySelector(".price-js");
// const type = document.querySelector(".product-type");
// const subPrice = document.querySelector(".cal-sub");
// const description = document.querySelector(".product-description");
// const btn = document.querySelectorAll(".quantity-c button");
// const productName = document.querySelector(".product-name");
// const productImg = document.querySelector(".product-img-small");
// const big = document.querySelector(".product-img-big");
// let subcal = function (data) {
//   let qty = document.querySelector(".q-value").value;
//   subPrice.innerHTML = qty * data + " kyats";
// };

// var producttt = JSON.parse(sessionStorage.getItem("product"));
const cartBask = document.querySelector("[cart]");
const cartCount = () => {
  var cartCount = JSON.parse(localStorage.getItem("cartMarigold")).length;
  cartBask.querySelector("span").innerHTML = cartCount;
};
cartCount();

const cartSideBar = () => {
  cartCount();
  var cartData = JSON.parse(localStorage.getItem("cartMarigold"));
  var cartHtml1 = document.querySelector("[cart-sidebar]");
  if (cartData == "") {
    cartHtml1.innerHTML = `
                     <div class="side-cart-product" cart-product>
                    </div>
                    <div class="side-cart-total">
                   </div>
                    <div class="side-cart-ni">
                    There is no item in Cart
                    </div>
                <div class="side-cart-cs">
                   Continued shopping
                </div>
                `;
  } else {
    cartHtml1.innerHTML = `
                  <div class="side-cart-product" cart-product>
                </div>
                <div class="side-cart-total">
                </div>
                <div class="side-cart-checkout">
                    PROCEED TO CHECKOUT
                </div>
                <div class="side-cart-view">
                    VIEW CART
                </div>
                `;
  }
  var cartHtml = cartHtml1.querySelector("[cart-product]");
  var cartHtml2 = "";
  var totalPrice = 0;
  var tt = cartHtml1.querySelector(".side-cart-total");
  cartData.forEach((cartData) => {
    var cartProduc = productList.find(
      (e) => e.product_id == cartData.product_id
    );
    cartHtml2 += `
                    <div class="sd-cart-product">
                        <img
                                    src="http://localhost:8000/storage/image/${
                                      cartProduc.image.split(",")[0]
                                    }" alt="">
                        <div class="sd-cart-descript">
                            <div class="sd-cart-name">${cartProduc.name}</div>
                            <div class="sd-cart-sc">${cartData.color}/${
      cartData.size
    }</div>
                            <div class="sd-cart-qp">${
                              cartData.product_count
                            } X ${cartProduc.price} Kyats</div>
                        </div>
                        <div><span class="sc-cross" sc-cross=${
                          cartData.cart_id
                        }>&#10006;</span></div>
                    </div>
               `;
    totalPrice += cartData.product_count * cartProduc.price;
  });
  totalPrice == 0
    ? (tt.innerHTML = ``)
    : (tt.innerHTML = `<span>Total: </span> <span>${totalPrice} kyats</span>`);
  cartHtml.innerHTML = cartHtml2;
  cartData.length == 0 ? (cartHtml.innerHTML = "") : "";

  cartHtml.querySelectorAll("[sc-cross]").forEach((sc) => {
    sc.addEventListener("click", () => {
      var cardIdd = sc.getAttribute("sc-cross");
      cartData = cartData.filter((e) => e.cart_id != cardIdd);
      localStorage.setItem("cartMarigold", JSON.stringify(cartData));
      cartSideBar();
    });
  });
};
cartSideBar();

const cartSideMain = document.querySelector("[data-cart-active]");
const cartCrossMain = document.querySelector("[sc-cross-main]");
const cartDisplay = () => {
  if (cartSideMain.dataset.cartActive == "false") {
    cartSideMain.dataset.cartActive = true;
    document.body.style.overflow = "hidden";
  } else {
    cartSideMain.dataset.cartActive = false;
    document.body.style.overflow = "auto";
  }
};
cartCrossMain.addEventListener("click", () => {
  cartDisplay();
});

cartBask.addEventListener("click", () => {
  cartSideBar();
  cartDisplay();
});

import { addToCart } from "./modu.js";
import { PaginationButton, footer } from "./modu.js";
const slides = document.querySelector("[data-slides]");
const pin = document.querySelector("[data-button]");
var timer = setInterval(carousel, 10000);
function carousel(offset) {
  const activeSlide = slides.querySelector("[data-active]");
  const activeSlide2 = pin.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide);
  (offset == undefined) | null ? (offset = 1) : (offset = offset);
  newIndex = newIndex + offset;
  if (newIndex < 0) {
    newIndex = slides.children.length - 1;
  } else if (newIndex >= slides.children.length) {
    newIndex = 0;
  }
  slides.children[newIndex].dataset.active = true;
  pin.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
  delete activeSlide2.dataset.active;
}
const buttons = document.querySelectorAll("[data-slide-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.slideButton === "next" ? 1 : -1;
    carousel(offset);
    clearInterval(timer);
    timer = setInterval(carousel, 8000);
  });
});

//price range

const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".price-slider .progress");
const priceInput = document.querySelectorAll(".price-input input");
let priceGap = 50000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    //get two value of price input to number
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);
    maxVal > 500000 ? (maxVal = 500000) : "";
    if (maxVal - minVal >= priceGap) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else if (e.target.className === "input-max") {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});
var filterMin = 0;
var filterMax = 500000;
var minVal = 0;
var maxVal = 500000;
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    //get two value of range input to number
    minVal = parseInt(rangeInput[0].value);
    maxVal = parseInt(rangeInput[1].value);
    if (maxVal - minVal < priceGap) {
      maxVal < priceGap ? (maxVal = priceGap) : "";
      minVal > maxVal ? (minVal = maxVal - priceGap) : "";
      // if else for slider
      if (e.target.className == "max-range") {
        rangeInput[1].value = minVal + priceGap;
      } else if (e.target.className == "min-range") {
        rangeInput[0].value = maxVal - priceGap;
      }
    } else {
      //progress bar
      filterMin = priceInput[0].value = minVal;
      filterMax = priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
// for view box
const viewBox = document.querySelectorAll("[data-view-box] div");
const viewBox1 = document.querySelector("[data-view-box]");
let productList = document.querySelector(".product-list");

viewBox.forEach((view) => {
  view.addEventListener("click", () => {
    let activeViewBox = viewBox1.querySelector("[data-active]");
    if (view != activeViewBox) {
      delete activeViewBox.dataset.active;
    }
    view.dataset.active = true;

    //css grid change

    // boxIndex = [...viewindex.children];
    let index = [...viewBox1.children].indexOf(view);
    sessionStorage.setItem("index", index);
    productStyle();
  });
});


function productStyle() {
  let ind = sessionStorage.getItem("index") * 1;
  ind == 0 ? (productList.dataset.box = true) : delete productList.dataset.box;
  productList.style.cssText = `grid-template-columns:repeat(${
    ind + 1
  }, minmax(auto, 1fr));`;
}

// category data
async function categoryData(url) {
  let res = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("category", JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
categoryData("https://fdfg.theorymm.com/api/category");
//product data
async function productData(url) {
  let res = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("productList", JSON.stringify(data));
      wait()
    })
    .catch(function (error) {
      console.log(error);
    });
}
productData("https://fdfg.theorymm.com/api/item");



function wait(){
  // for quick view

const quickView = document.querySelector(".quick-cross");
const quickView1 = document.querySelectorAll(".quick-view");
const productQuickView = document.querySelector(".product-quick-view");
const productQuickViewCard = document.querySelector(".quick-view-card");


//product data
const productli = document.querySelector(".product-list");

var productLists = JSON.parse(sessionStorage.getItem("productList"));


var tem = JSON.parse(sessionStorage.getItem("productList"));
var bem = JSON.parse(sessionStorage.getItem("productList"));

//pagination

var paginationButtons = new PaginationButton(itemCount, 10, 5);
paginationButtons.render();

//footer display
footer();
var productPage = 1;
// productLists = paginate(productLists, 1, 10);
productListApply(productLists);

var itemCount = tem.length;
//paginate
function paginate(array, page_number, page_size) {
 
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

///sortBy
const sortBy = document.querySelector(".select-sortby");
const limit = document.querySelector(".limit");
const selectFilter = document.querySelectorAll(".toolBar-child select");
selectFilter.forEach((e) => {
  e.addEventListener("change", function () {
    sort(sortBy.value, tem);
    productLists = paginate(tem, 1, limit.value);
    productListApply(productLists);
    pagiChange();
  });
});

function pagiChange() {
  document.querySelector(".pagi").firstChild.remove();
  paginationButtons = new PaginationButton(tem.length, limit.value, 5);
  paginationButtons.render();
  paginationButtons.onChange((e) => {
    productPage = e.target.value;
    sort(sortBy.value, tem);
    productLists = paginate(tem, productPage, limit.value);
    productListApply(productLists);
  });
}
pagiChange();

//category

///category filter
const filterBtn = document.querySelectorAll(".filter-btn button");

filterBtn.forEach((filter) => {
  filter.addEventListener("click", function () {
    if (filter == filterBtn[0]) {
      var color = document.querySelectorAll(".color-box input");
      var colorArr = [];
      tem = bem.filter((e) => {
        return e.price <= filterMax && e.price >= filterMin;
      });
      itemCount = tem.length;
      color.forEach((e, index) => {
        e.checked == true ? colorArr.push(e.name) : "";
      });
      if (colorArr != "") {
        tem = tem.filter((e) => {
          return colorArr.some((s) => e.color.includes(s));
        });
      }
    } else if (filter == filterBtn[1]) {
      tem = bem;
    }
    productLists = paginate(tem, 1, limit.value);
    pagiChange();
    productListApply(productLists);
    closeCategory();
  });
});

//color box

//category innerHtml
var colorList = JSON.parse(sessionStorage.getItem("category")).color;
var categoryList = JSON.parse(sessionStorage.getItem("category")).category;
var groupList = JSON.parse(sessionStorage.getItem("category")).group;

function categoryDataApply() {
  const colorBox = document.querySelector(".color-box");
  const categoryBox = document.querySelector(".categories");
  let colorHtml = "";
  //color apply
  colorList.forEach((list) => {
    var label = ` <label for="color${list.color_id}" style="background-color:${list.color_code};" title="${list.name}">   <span></span>  </label>`;
    if (list.name == "Mixed") {
      label = ` <label for="color${list.color_id}" style="display:grid;grid-template-columns: 50% 50%;" title="${list.name}">
      <span></span>
                                            <div style="width:100%;height:100%;background-color:#FF85A2;border-radius:100% 0px 0 0%">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#FFE300;border-radius:0 100% 0px 0">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#5A86AD;border-radius: 0px 0 0% 100%">
                                            </div>
                                            <div style="width:100%;height:100%;background-color:#FFF9EC;border-radius:0 0% 100% 0px">
                                            </div> </label> 
        `;
    }
    colorHtml += `<span >
                           <input type="checkbox" name="${list.name}" class="color-checkbox" id="color${list.color_id}"  title="${list.name}">
                        ${label}
                  </span>`;
  });
  colorBox.innerHTML = colorHtml;
  let categoryHtml = "<h3>Categories</h3>";
  //category and group apply
  categoryList.forEach((list) => {
    //group list
    var gtem = groupList.filter((g) => {
      return list.category_id == g.category_id;
    });
    let gtem2 = "";
    gtem.forEach((e) => {
      gtem2 += `<div> <span data-val="${e.name}">${e.name}</span></div>`;
    });
    categoryHtml += ` <div class="category-select" bis_skin_checked="1">
                            <label for="${list.name}" class="first-label">
                            ${list.name}</label> <input type="checkbox" 
                            id="${list.name}" class="category-check">
                            <span class="arrow">❮</span>
                            <div class="select-box" bis_skin_checked="1">
                            <div> <span  data-val="${list.name}">All ${list.name}</span></div>
                            ${gtem2}
                            </div>
                        </div>`;
  });
  categoryBox.innerHTML = categoryHtml;

  const groupFilter = categoryBox.querySelectorAll(
    ".category-select .select-box span"
  );

  //group filter
  groupFilter.forEach((group) => {
    group.addEventListener("click", function () {
      var groupVal = group.getAttribute("data-val");

      if (categoryList.find((e) => e.name == groupVal)) {
        var gl = categoryList.find((e) => e.name == groupVal);
        tem = bem.filter((e) => e.category_id == gl.category_id);
      } else {
        var ge = groupList.find((e) => e.name == groupVal);
        tem = bem.filter((e) => e.group_id == ge.id);
      }
      productLists = tem;
      productLists = paginate(tem, 1, limit.value);
      pagiChange();
      productListApply(productLists);
      closeCategory();
    });
  });
}

categoryDataApply();

//product apply
function productListApply(productLists) {
  let html = "";
  
  productLists.forEach((list) => {
    html += `<div class="product-card">
                        <div class="product-img"><a href="/productPage.html?id=${
                          list.product_id
                        }"><span hidden disabled>${list.product_id}</span><img
                                    src="https://fdfg.theorymm.com/storage/image/${
                                      list.image.split(",")[0]
                                    }" alt=""></a>
                            <div class="product-icon">
                                <div class="quick-view"><img src="./image/icon/view.png" alt=""></div>
                                <div class="add-cart"  add-cart><img src="./image/icon/cart-plus.png" alt=""></div>
                            </div>
                        </div>
                        <div class="product-article">
                            <div class="product-text">
                                <div class="product-name">${list.name}</div>
                                <div class="product-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                            </div>
                            <div class="product-price">${
                              list.price
                            }&ensp;kyats</div>
                        </div>
                    </div>`;
    // html.addEventListener("click", function (e) {
    //   console.log(e.target);
    // });
  });
  productli.innerHTML = html;
  productli.childNodes.forEach((e) => {
    var Pid = e.getElementsByTagName("span")[0].innerHTML;
    e.querySelector(".quick-view").addEventListener("click", () => {
      quickViewFunc(Pid);
    });
    e.querySelector("[add-cart]").addEventListener("click", () => {
      addToCart(Pid, "default");
      cartCount();
    });
  });
}

//sort function
function sort(sortValue, tem) {
  if (sortValue === "p1") {
    tem.sort((a, b) => a.price - b.price);
  } else if (sortValue === "p2") {
    tem.sort((a, b) => b.price - a.price);
  } else if (sortValue === "asc") {
    tem.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
    });
  } else if (sortValue === "desc") {
    tem.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
    });
  } else if (sortValue === "oldest") {
    tem.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else {
    tem.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
}

//display with mobile problem

//sidebar
const navBarMenu = document.querySelector(".nav-bar-menu");
const scrollBarCross = document.querySelector(".category-btn");
const categoryParent = document.querySelector(".category-parent");
navBarMenu.addEventListener("click", () => {
  categoryParent.style.cssText =
    "display:grid;transform:translate(0%);transform-origin:left;pointer-events:auto;";
  document.body.style.cssText = "overflow:hidden;pointer-events:none;";
});
scrollBarCross.addEventListener("click", () => {
  categoryParent.style.cssText = "transform:translate(-100%);";
  document.body.style.cssText = "overflow:auto;pointer-events:auto;";
});
// when scrolling side bar diable home scroll

//close categories panel

function closeCategory() {
  if (screen.width <= 1000) {
    scrollBarCross.click();
  }
}

//addtocart

const cartBask = document.querySelector("[cart]");
const cartCount = () => {
  var cartCount =
    localStorage.getItem("cartMarigold") == null
      ? 0
      : JSON.parse(localStorage.getItem("cartMarigold")).length;

  cartBask.querySelector("span").innerHTML = cartCount;
};
cartCount();

//get cart data

const cartSideBar = (pp) => {
  cartCount();
  var cartData =
    localStorage.getItem("cartMarigold") == null
      ? []
      : JSON.parse(localStorage.getItem("cartMarigold"));
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
    var cartProduc = bem.find((e) => e.product_id == cartData.product_id);
    cartHtml2 += `
                    <div class="sd-cart-product">
                        <img 
                                    src="https://fdfg.theorymm.com/storage/image/${
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
      cartSideBar(pp);
    });
  });
};
cartSideBar(bem);

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
  cartDisplay(bem);
});

cartBask.addEventListener("click", () => {
  cartSideBar(bem);
  cartDisplay();
});



function quickViewFunc(id) {
  productQuickView.style.display = "grid";
  let data = tem.find((x) => x.product_id == id);
  var qcolorList = data.color.split(",");
  var qcolorSelect = "";
  qcolorList.forEach((list) => {
    var qColorCode = colorList.find((e) => e.name === list).color_code;

    if (qColorCode == "Mixed") {
      qcolorSelect += `
            <input type="radio" name="color" id="${qColorCode}" class="color-radio" value="${list}">
            <label for="${qColorCode}"style="display:grid;grid-template-columns: 50% 50%;"  title="${list}"> 
           <div style="width:100%;height:100%;background-color:#FF85A2;border-radius:100% 0px 0 0%">
              </div>
              <div style="width:100%;height:100%;background-color:#FFE300;border-radius:0 100% 0px 0">
              </div>
               <div style="width:100%;height:100%;background-color:#5A86AD;border-radius: 0px 0 0% 100%">
              </div>
              <div style="width:100%;height:100%;background-color:#FFF9EC;border-radius:0 0% 100% 0px">
              </div> 
              </label>
            `;
    } else {
      qcolorSelect += `
              <input type="radio" name="color" id="${qColorCode}" class="color-radio"  value="${list}">
            <label for="${qColorCode}" style="background-color:${qColorCode};"  title="${list}"> </label>
                                    `;
    }
  });
  productQuickViewCard.innerHTML = `<div class="quick-img" bis_skin_checked="1"><img src="https://fdfg.theorymm.com/storage/image/${
    data.image.split(",")[0]
  }" alt=""></div>
                        <div class="quick-article" bis_skin_checked="1">
                            <div class="quick-category" bis_skin_checked="1">${
                              data.categoryName
                            }</div>
                            <div class="quick-header" bis_skin_checked="1">${
                              data.name
                            }</div>
                            <div class="quick-description" bis_skin_checked="1">${
                              data.decription
                            }</div>
                            <div class="size" bis_skin_checked="1">
                                <h4>SIZE</h4>
                                <div bis_skin_checked="1">
                                    <span><input type="radio" name="qcolor" id="qcolor1" class="qCheck" checked="" value="S"><label for="qcolor1"> Standard</label></span>
                                    <span><input type="radio" name="qcolor" id="qcolor2" class="qCheck" value="D"><label for="qcolor2">Deluxe</label></span>
                                    <span><input type="radio" name="qcolor" id="qcolor3" class="qCheck" value="P"><label for="qcolor3">Premium</label></span>
                                </div>
                            </div>
                            <div class="quick-color color11" bis_skin_checked="1">
                                <h4>COLOR</h4>
                                   <div class="color-check">
                                       ${qcolorSelect}
                                    </div>
                            </div>
                            <div class="quick-price" bis_skin_checked="1">
                                <span class="price2">
                               
                                    <span>${data.price}</span> KYATS
                                </span>
                                <div class="quick-quantity" bis_skin_checked="1">
                                    <input class="quantity" name="quantity" min="1" value="1" type="number">
                                    <div class="quick-btn" bis_skin_checked="1">
                                        <button  class='minus'>↓</button>
                                        <button class="plus">↑</button>
                                    </div>
                                </div>
                                <div class="quick-cart" bis_skin_checked="1">Add to cart&ensp;🛒</div>
                            </div>
                            <div class="quick-cross" bis_skin_checked="1">
                                ⨉
                            </div>
                        </div>
`;

  // color checked

  productQuickViewCard.querySelector(".color-check input").checked = true;

  //cross delete
  productQuickViewCard
    .querySelector(".quick-cross")
    .addEventListener("click", function () {
      productQuickView.style.display = "none";
    });

  //price calculate quick view
  var qUnit = productQuickViewCard.querySelector(".quantity");
  var qPrice = productQuickViewCard.querySelector(".price2 span");
  qUnit.addEventListener("change", function () {
    qPrice.innerHTML = data.price * qUnit.value;
  });
  productQuickViewCard.querySelectorAll(".quick-btn button").forEach((e) => {
    e.addEventListener("click", function () {
      e.classList == "plus" ? qUnit.stepUp() : qUnit.stepDown();
      qPrice.innerHTML = data.price * qUnit.value;
    });
  });

  //addtocart
  productQuickViewCard
    .querySelector(".quick-cart")
    .addEventListener("click", (e) => {
      var psize = productQuickViewCard.querySelector(
        '.size input[name="qcolor"]:checked'
      ).value;
      var pcolor = productQuickViewCard.querySelector(
        '.color-check input[name="color"]:checked'
      ).value;
      addToCart(data.product_id, pcolor, qUnit.value * 1, psize);
      cartCount();
    });
}

}
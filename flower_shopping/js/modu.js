const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;

  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }

  let from = Math.max(to - max, 0);

  return Array.from({ length: Math.min(total, max) }, (_, i) => i + 1 + from);
};

export function PaginationButton(
  item,
  limit,
  maxPagesVisible = 10,
  currentPage = 1
) {
  let totalPages = Math.ceil(item / limit);

  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    prev: () => currentPage === 1 || currentPage > totalPages,

    next: () => currentPage >= totalPages,
  };
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement("div");
  paginationButtonContainer.className = "pagination-buttons";

  const createAndSetupButton = (
    label = "",
    cls = "",
    disabled = false,
    handleClick
  ) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;
    buttonElement.disabled = disabled;
    buttonElement.addEventListener("click", (e) => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;
      paginationButtonContainer.dispatchEvent(
        new CustomEvent("change", { detail: { currentPageBtn } })
      );
    });

    return buttonElement;
  };

  const onPageButtonClick = (e) =>
    (currentPage = Number(e.currentTarget.textContent));

  const onPageButtonUpdate = (index) => (btn) => {
    btn.textContent = pages[index];

    if (pages[index] === currentPage) {
      currentPageBtn.classList.remove("active");
      btn.classList.add("active");
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };

  buttons.set(
    createAndSetupButton(
      "prev",
      "prev-page",
      disabled.prev(),
      () => (currentPage -= 1)
    ),
    (btn) => (btn.disabled = disabled.prev())
  );

  pages.map((pageNumber, index) => {
    const isCurrentPage = currentPage === pageNumber;
    const button = createAndSetupButton(
      pageNumber,
      isCurrentPage ? "active" : "",
      false,
      onPageButtonClick
    );

    if (isCurrentPage) {
      currentPageBtn = button;
    }

    buttons.set(button, onPageButtonUpdate(index));
  });

  buttons.set(
    createAndSetupButton(
      "next",
      "next-page",
      disabled.next(),
      () => (currentPage += 1)
    ),
    (btn) => (btn.disabled = disabled.next())
  );

  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);

  this.render = (container = document.querySelector(".pagi")) => {
    container.appendChild(paginationButtonContainer);
  };

  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  };

  this.onChange = (handler) => {
    paginationButtonContainer.addEventListener("change", handler);
  };
  return currentPage;
}

export function footer() {
  if (screen.width <= 500) {
    var footerData = document.querySelectorAll("[data-footer]");
    footerData.forEach((footer) => {
      let footerDisplay = footer.children[1];
      footer.addEventListener("click", (e) => {
        if (footerDisplay.dataset.display == "true") {
          footerDisplay.style.display = "block";
          footerDisplay.dataset.display = "false";
        } else if (footerDisplay.dataset.display == "false") {
          footerDisplay.style.display = "none";
          footerDisplay.dataset.display = "true";
        }
      });
    });
  }
}
// addToCart
export function addToCart(productId, color, count = 1, size = "S") {
  var cart = new Array();
  // let cartCookies = getCookies("cartMarigold");
  let cartStorage = localStorage.getItem("cartMarigold");

  if (cartStorage == null) {
    cart.push({
      cart_id: 1,
      product_id: productId,
      product_count: count,
      size: size,
      color: color,
    });
  } else if (cartStorage != null) {
    cart = JSON.parse(cartStorage);
    cart.push({
      cart_id: Math.random().toString(36).slice(2, 8),
      product_id: productId,
      product_count: count,
      size: size,
      color: color,
    });
  }
  var cartj = JSON.stringify(cart);

  localStorage.setItem("cartMarigold", cartj);
}

//loader 

export function loader(stat = 0) {
  const body = document.body
  let div = document.createElement("div")
  body.append(div)
  body.style.overflow = 'hidden'
  div.classList.add('loader');
  div.style.cssText = "position:fixed;left: 0; top: 0;right: 0;bottom: 0; width: 100vw; height: 100vh;z-index: 90";
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    div.innerHTML = this.response;
  };
  xhr.open('GET', '/loader.html', true);
  xhr.send();

  if (stat == 1) {

    body.style.overflow = 'auto'
    document.querySelector('.loader').remove()
    div.remove()
  }
}

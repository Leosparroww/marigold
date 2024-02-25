const slides = document.querySelector("[data-slides]");

setInterval(function () {
  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide);
  newIndex = newIndex + 1;
  if (newIndex < 0) {
    newIndex = slides.children.length - 1;
  } else if (newIndex >= slides.children.length) {
    newIndex = 0;
  }
  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}, 10000);

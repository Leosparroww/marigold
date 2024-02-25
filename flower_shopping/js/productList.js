export function product() {
  const productList = document.querySelector(".productList");
  console.log("l");
}
console.log("d");

const pageNumber = (total, max, current) => {
  const half = max / 2;
  let to = max;
  if (current + half >= total) {
    to = total;
  } else if (current > half) {
    to = current + half;
  }
  let from = to - max;
  console.log(from, to, max);
  return Array.from({ length: max }, (_, i) => i + 1 + from);
};
console.log(pageNumber(100, 6, 100));

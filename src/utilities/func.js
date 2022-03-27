export const sumPrice = (cart) =>
  cart.map((item) => item.sold).reduce((prev, curt) => prev + curt, 0);

export function scrollBottom(selectedPanel, isSmooth = true) {
  setTimeout(() => {
    selectedPanel.current.scrollTo({
      left: 0,
      top: selectedPanel.current.scrollHeight,
      behavior: isSmooth ? "smooth" : "auto",
    });
  }, 1);
}

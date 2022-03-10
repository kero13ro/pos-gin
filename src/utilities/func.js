export const sumPrice = (cart) =>
  cart.map((item) => item.price).reduce((prev, curt) => prev + curt, 0);

export function scrollBottom(selectedPanel) {
  setTimeout(() => {
    selectedPanel.current.scrollTo({
      left: 0,
      top: selectedPanel.current.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
}

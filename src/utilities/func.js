export const sumPrice = (cart) =>
  cart.map((item) => item.price).reduce((prev, curt) => prev + curt, 0);

export function scrollBottom(cartPanel) {
  setTimeout(() => {
    cartPanel.current.scrollTo({
      left: 0,
      top: cartPanel.current.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
}

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

export const getStatusLabel = (num) => {
  if (num === 1) return "入庫";
  if (num === 2) return "售出";
  if (num === 3) return "即期折扣";
  if (num === 4) return "開瓶";
  if (num === 5) return "破損";
  if (num === 6) return "下架";
};

export const statusMap = {
  11: "入庫",

  21: "售出",
  22: "即期折扣",
  23: "開瓶",

  91: "破損",
  92: "下架",
};

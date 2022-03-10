// const itemDetail = {
//   cid: 101,
//   cat: "杯裝(700ml)",
//   price: 30,
//   expiry: "2022-10-12",
// };

const allItems = [
  {
    type: "無糖豆漿",
    tid: 100,
    sub: [
      { cid: 101, cat: "杯裝(700ml)", price: 30 },
      { cid: 102, cat: "罐裝(1500ml)", price: 60 },
    ],
  },
  {
    type: "微糖豆漿",
    tid: 200,
    sub: [
      { cid: 201, cat: "杯裝(700ml)", price: 30 },
      { cid: 202, cat: "罐裝(1500ml)", price: 60 },
    ],
  },
  {
    type: "南瓜豆漿",
    tid: 300,
    sub: [
      { cid: 301, cat: "杯裝(700ml)", price: 65 },
      { cid: 302, cat: "罐裝(1000ml)", price: 80 },
      { cid: 303, cat: "大罐裝(1500ml)", price: 120 },
    ],
  },
  {
    type: "青仁黑豆漿",
    tid: 400,
    sub: [
      { cid: 401, cat: "杯裝(700ml)", price: 65 },
      { cid: 402, cat: "罐裝(1000ml)", price: 80 },
    ],
  },
  {
    type: "紅棗豆漿",
    tid: 500,
    sub: [
      { cid: 501, cat: "杯裝(700ml)", price: 65 },
      { cid: 502, cat: "罐裝(1000ml)", price: 80 },
    ],
  },
  {
    type: "烏龍紅茶豆漿",
    tid: 600,
    sub: [
      { cid: 601, cat: "杯裝(700ml)", price: 65 },
      { cid: 602, cat: "罐裝(1000ml)", price: 80 },
      { cid: 603, cat: "大罐裝(1500ml)", price: 120 },
    ],
  },
  {
    type: "杏仁豆漿",
    tid: 700,
    sub: [
      { cid: 701, cat: "杯裝(700ml)", price: 65 },
      { cid: 702, cat: "罐裝(1000ml)", price: 80 },
      { cid: 703, cat: "大罐裝(1500ml)", price: 120 },
    ],
  },
  {
    type: "黃豆製品",
    tid: 800,
    sub: [
      { cid: 801, cat: "豆腐(4塊/盒)", price: 40 },
      { cid: 802, cat: "油豆腐(8塊/盒)", price: 55 },
      { cid: 803, cat: "凍豆腐(600克)", price: 65 },
      { cid: 804, cat: "傳統豆花", price: 45 },
    ],
  },
];

export { allItems };

// status: 1 - 進貨 、2 - 出貨

// sheet 1. 商品定義
export const CategoryList = [
  { cid: "101", type: "無糖豆漿", cat: "杯裝(700ml)", price: 30 },
  { cid: "102", type: "無糖豆漿", cat: "罐裝(1500ml)", price: 55 },
  { cid: "201", type: "微糖豆漿", cat: "杯裝(700ml)", price: 30 },
  { cid: "202", type: "微糖豆漿", cat: "罐裝(1500ml)", price: 55 },

  { cid: "301", type: "南瓜豆漿", cat: "杯裝(700ml)", price: 50 },
  { cid: "302", type: "南瓜豆漿", cat: "罐裝(1000ml)", price: 60 },

  { cid: "401", type: "青仁黑豆漿", cat: "杯裝(700ml)", price: 50 },
  { cid: "402", type: "青仁黑豆漿", cat: "罐裝(1000ml)", price: 60 },

  { cid: "501", type: "紅棗豆漿", cat: "杯裝(700ml)", price: 50 },
  { cid: "502", type: "紅棗豆漿", cat: "罐裝(1000ml)", price: 60 },

  { cid: "601", type: "烏龍紅茶豆漿", cat: "杯裝(700ml)", price: 50 },
  { cid: "602", type: "烏龍紅茶豆漿", cat: "罐裝(1000ml)", price: 60 },

  { cid: "701", type: "杏仁豆漿", cat: "杯裝(700ml)", price: 50 },
  { cid: "702", type: "杏仁豆漿", cat: "罐裝(1000ml)", price: 60 },

  { cid: "801", type: "黃豆製品", cat: "豆腐(4塊/盒)", price: 40 },
  { cid: "802", type: "黃豆製品", cat: "油豆腐(8塊/盒)", price: 55 },
  { cid: "803", type: "黃豆製品", cat: "凍豆腐(600克)", price: 65 },
  { cid: "804", type: "黃豆製品", cat: "傳統豆花", price: 45 },

  { cid: "901", type: "杯裝飲品", cat: "珍珠撞豆奶", price: 40 },
  { cid: "902", type: "杯裝飲品", cat: "烏龍紅茶", price: 25 },
  { cid: "903", type: "杯裝飲品", cat: "冬瓜茶", price: 25 },
  { cid: "904", type: "杯裝飲品", cat: "檸檬紅茶", price: 30 },
  { cid: "905", type: "杯裝飲品", cat: "檸檬冬瓜茶", price: 30 },
];

const typeName = [...new Set(CategoryList.map((ob) => ob.type))];

// 將所有商品分層，主類別、次類別，提供 UI 使用
export const TypeList = typeName.map((type) => ({
  type,
  sub: CategoryList.filter((item) => item.type === type),
}));

// sheet 2. 每日庫存紀錄。提供未來查詢

// sheet 3. 當日原始庫存 + 變動紀錄。加總即是當前庫存
export const StockListMock = [
  { cid: "102", count: 7, expiry: "2022/03/18" },
  { cid: "802", count: 5, expiry: "2022/03/18" },
  { cid: "702", count: 5, expiry: "2022/03/18" },
  { cid: "402", count: 5, expiry: "2022/03/18" },
];

// export const allItems = [
//   {
//     type: "無糖豆漿",
//     tid: 100,
//     sub: [
//       { cid: 101, cat: "杯裝(700ml)", price: 30 },
//       { cid: 102, cat: "罐裝(1500ml)", price: 60 },
//     ],
//   },
//   {
//     type: "微糖豆漿",
//     tid: 200,
//     sub: [
//       { cid: 201, cat: "杯裝(700ml)", price: 30 },
//       { cid: 202, cat: "罐裝(1500ml)", price: 60 },
//     ],
//   },
//   {
//     type: "南瓜豆漿",
//     tid: 300,
//     sub: [
//       { cid: 301, cat: "杯裝(700ml)", price: 65 },
//       { cid: 302, cat: "罐裝(1000ml)", price: 80 },
//       { cid: 303, cat: "大罐裝(1500ml)", price: 120 },
//     ],
//   },
//   {
//     type: "青仁黑豆漿",
//     tid: 400,
//     sub: [
//       { cid: 401, cat: "杯裝(700ml)", price: 65 },
//       { cid: 402, cat: "罐裝(1000ml)", price: 80 },
//     ],
//   },
//   {
//     type: "紅棗豆漿",
//     tid: 500,
//     sub: [
//       { cid: 501, cat: "杯裝(700ml)", price: 65 },
//       { cid: 502, cat: "罐裝(1000ml)", price: 80 },
//     ],
//   },
//   {
//     type: "烏龍紅茶豆漿",
//     tid: 600,
//     sub: [
//       { cid: 601, cat: "杯裝(700ml)", price: 65 },
//       { cid: 602, cat: "罐裝(1000ml)", price: 80 },
//       { cid: 603, cat: "大罐裝(1500ml)", price: 120 },
//     ],
//   },
//   {
//     type: "杏仁豆漿",
//     tid: 700,
//     sub: [
//       { cid: 701, cat: "杯裝(700ml)", price: 65 },
//       { cid: 702, cat: "罐裝(1000ml)", price: 80 },
//       { cid: 703, cat: "大罐裝(1500ml)", price: 120 },
//     ],
//   },
//   {
//     type: "黃豆製品",
//     tid: 800,
//     sub: [
//       { cid: 801, cat: "豆腐(4塊/盒)", price: 40 },
//       { cid: 802, cat: "油豆腐(8塊/盒)", price: 55 },
//       { cid: 803, cat: "凍豆腐(600克)", price: 65 },
//       { cid: 804, cat: "傳統豆花", price: 45 },
//     ],
//   },
// ];

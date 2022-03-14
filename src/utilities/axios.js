import axios from "axios";
import moment from "moment";

export const axiosIns = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:9107/"
      : "https://sheet1218.herokuapp.com",
});

export function MutateStock(list) {
  const params = {
    created: moment().format("YY/MM/DDTHH:mm"),
    list,
  };

  axiosIns.post("addRowsAt?sheetName=stock", params);
}

// 抓取當日庫存
export async function FetchStock(update) {
  const { data } = await axiosIns.get("getStock?sheetName=stock");
  const list = data.map((ob) => ({ ...ob, count: Number(ob.count) }));

  // 1. 將入庫同類商品全部加總
  let incomeList = list.filter((ob) => ob.status === "1");
  let incomeId = [...new Set(incomeList.map((ob) => ob.cid))];

  incomeList = incomeId.map((cid) => {
    const arr = incomeList.filter((ob) => ob.cid === cid);
    const count = arr.map((ob) => ob.count).reduce((a, b) => a + b);

    return { ...arr[0], count };
  });

  // 2. 將出庫同類商品全部加總
  let outcomeList = list.filter((ob) => ob.status === "2");
  let outcomeId = [...new Set(outcomeList.map((ob) => ob.cid))];

  outcomeList = outcomeId.map((cid) => {
    const arr = outcomeList.filter((ob) => ob.cid === cid);
    const count = arr.map((ob) => ob.count).reduce((a, b) => a + b);

    return { cid, count };
  });

  // 3. 將入庫數量 扣除出庫數量
  incomeList = incomeList.map((ob) => {
    const deficit = outcomeList.find((ob2) => ob2.cid === ob.cid)?.count || 0;
    let count = ob.count - deficit;

    return { ...ob, count };
  });

  update(incomeList);
}

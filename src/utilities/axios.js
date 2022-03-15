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
  // google sheet API 匯出均為 string
  const { data } = await axiosIns.get("getStock?sheetName=stock");
  const list = data.map((ob) => ({ ...ob, count: Number(ob.count) }));

  // 1. 將入庫同類商品全部加總
  let incomeList = list.filter((ob) => ob.status === "1");
  let incomeListByUnique = [];
  incomeList.forEach((ob1) => {
    const target = incomeListByUnique.find(
      (ob2) => ob1.cid === ob2.cid && ob1.expiry === ob2.expiry
    );
    if (!target) {
      incomeListByUnique.push(ob1);
    } else {
      target.count = target.count + ob1.count;
    }
  });

  // 2. 扣除出庫數量
  let outcomeList = list.filter((ob) => ob.status === "2");
  outcomeList.forEach((ob1) => {
    const target = incomeListByUnique.find(
      (ob2) => ob1.cid === ob2.cid && ob1.expiry === ob2.expiry
    );

    if (target) {
      target.count = target.count - ob1.count;
    }
  });

  update(incomeListByUnique);
}

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

  update(data);
}

import React from "react";
import { useImmer } from "use-immer";
import { Table, Tag } from "antd";
import { FetchStock } from "../utilities/axios";
import { CategoryList } from "../utilities/constants";

const columns = [
  {
    title: "時間",
    dataIndex: "created",
    key: "created",
    render: (time) => (
      <>
        <div className="fz12">{time.split("T")[0].substr(3)}</div>
        <div className="fz12 gray">{time.split("T")[1]}</div>
      </>
    ),
  },
  {
    title: "進出貨",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (status === "1") {
        return <Tag color="green">進貨</Tag>;
      }
      return <Tag color="gold">出貨</Tag>;
    },
  },
  {
    title: "類型",
    dataIndex: "cid",
    key: "cid",
    render: (_, ob) => (
      <>
        <div className="fz12">{ob.type}</div>
        <div className="fz12 gray">{ob.cat}</div>
      </>
    ),
  },
  {
    title: "數量",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "到期日",
    dataIndex: "expiry",
    key: "expiry",
    render: (ts) => <>{ts.substr(5)}</>,
  },
];

export default function Search() {
  const [stockList, updateStockList] = useImmer([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let list = await FetchStock();

      list = list.map((ob) => ({
        ...ob,
        ...CategoryList.find((ob2) => ob.cid === ob2.cid),
      }));

      updateStockList(list);

      console.log({ list });
    };
    fetchData();
  }, [updateStockList]);

  return (
    <div id="Search">
      <Table
        columns={columns}
        dataSource={stockList.map((ob) => ({
          ...ob,
          key: `${ob.created}-${ob.cid}-${ob.status}`,
        }))}
        size="small"
        pagination={false}
      ></Table>
    </div>
  );
}

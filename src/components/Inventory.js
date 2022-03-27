import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { CategoryList } from "utilities/constants";

export default function Inventory() {
  const stockList = useSelector((state) => state.stock.stockList);

  const CategoryWithSum = CategoryList.map((ob) => ({
    ...ob,
    sum: 0,
    key: ob.cid,
  }));

  stockList.forEach((stock) => {
    const ta = CategoryWithSum.find((item) => item.cid === stock.cid);

    if (stock.status === "a1") {
      ta.sum += stock.count;
    } else {
      ta.sum -= stock.count;
    }
  });

  return (
    <div id="Inventory">
      <Table
        columns={TableColumns}
        dataSource={CategoryWithSum}
        size="small"
        pagination={false}
        style={{ paddingBottom: "45px" }}
      ></Table>
    </div>
  );
}

const TableColumns = [
  {
    title: "品項",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "類型",
    dataIndex: "cat",
    key: "cat",
  },
  {
    title: "數量",
    dataIndex: "sum",
    key: "sum",
    render: (val) => <div className="tx_right">{val}</div>,
  },
];

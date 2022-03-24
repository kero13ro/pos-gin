import React from "react";
import { useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import styled from "@emotion/styled";
import { CategoryList } from "utilities/constants";

export default function Search() {
  const stockList = useSelector((state) => state.stock.stockList);

  const fullData = stockList.map((ob) => ({
    ...ob,
    ...CategoryList.find((ob2) => ob.cid === ob2.cid),
    key: uuidv4(),
  }));

  // const dailyVolume = () =>
  //   fullData.map((ob) => Number(ob.sold) || 0).reduce((a, b) => a + b, 0);
  const dailyVolume = () => 123;

  // const dailyOut = () =>
  //   fullData.map((ob) => Number(ob.count) || 0).reduce((a, b) => a + b, 0);

  return (
    <div id="Search">
      <Table
        columns={TableColumns}
        dataSource={fullData}
        size="small"
        pagination={false}
        style={{ paddingBottom: "45px" }}
      ></Table>

      <Footer>
        <div>今日營業額：{dailyVolume()}</div>
      </Footer>
    </div>
  );
}

const Footer = styled.div`
  width: 100vw;
  height: 45px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(204 204 204 / 50%);
`;

const TableColumns = [
  {
    title: "時間",
    dataIndex: "created",
    key: "created",
    render: (time) => (
      <>
        <div className="fz12">{moment(time, "YYYY/MM/DD").format("M/DD")}</div>
        <div className="fz12 gray">
          {moment(time, "YYYY/MM/DD-HH:mm").format("HH:mm")}
        </div>
      </>
    ),
  },
  {
    title: "進出貨",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (status === "a1") {
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
    title: "到期日",
    dataIndex: "expiry",
    key: "expiry",
    render: (ts) => (
      <div className="fz12">{moment(ts, "YYYY/MM/DD").format("M/DD")}</div>
    ),
  },
  {
    title: "數量",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "折價",
    dataIndex: "discount",
    key: "discount",
    render: (price) => (
      <>
        <div className="fz12 gray">{price}</div>
      </>
    ),
  },
];

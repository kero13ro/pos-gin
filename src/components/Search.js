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

  const dailyVolume = () =>
    fullData.map((ob) => Number(ob.sold) || 0).reduce((a, b) => a + b, 0);

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
      if (status === "b1") return <Tag color="green">售出</Tag>;
      if (status === "b2") return <Tag color="gold">折扣</Tag>;
      if (status === "b3") return <Tag color="gold">零售</Tag>;
      if (status === "c1") return <Tag color="gold">破損</Tag>;
      if (status === "c2") return <Tag color="gold">試喝</Tag>;
      if (status === "c3") return <Tag color="gold">下架</Tag>;

      return <Tag color="green">入庫</Tag>;
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
    title: "售價",
    dataIndex: "discount",
    key: "discount",
    render: (price, ob) => (
      <>
        {ob.discount && ob.discount !== "0" && (
          <div className="fz12 gray">-{ob.discount}</div>
        )}
        <div className="fz12 bold">{ob.sold}</div>
      </>
    ),
  },
];

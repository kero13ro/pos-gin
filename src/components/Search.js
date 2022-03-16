import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import styled from "@emotion/styled";
import { FetchStock } from "../utilities/axios";
import { CategoryList } from "../utilities/constants";
import { updateStock } from "../store/slice/stock";

export default function Search() {
  const dispatch = useDispatch();
  const stockList = useSelector((state) => state.stock.stockList);

  const fetchData = async () => {
    if (stockList.length !== 0) return;

    FetchStock()
      .then((data) => dispatch(updateStock(data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        footer={() => {
          return (
            <Footer>
              {/* <span>{dailyOut()}</span> */}
              今日營業額：{dailyVolume()}
            </Footer>
          );
        }}
      ></Table>
    </div>
  );
}

const Footer = styled.div`
  text-align: right;
`;

const TableColumns = [
  {
    title: "時間",
    dataIndex: "created",
    key: "created",
    render: (time) => (
      <>
        <div className="fz12">{moment(time).format("M/DD")}</div>
        <div className="fz12 gray">{moment(time).format("HH:mm")}</div>
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
    title: "到期日",
    dataIndex: "expiry",
    key: "expiry",
    render: (ts) => <div className="fz12">{moment(ts).format("M/DD")}</div>,
  },
  {
    title: "數量",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "售出",
    dataIndex: "sold",
    key: "sold",
    render: (price) => (
      <>
        <div className="fz12 gray">{price}</div>
      </>
    ),
  },
];

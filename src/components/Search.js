import React, { useEffect, useRef, useState } from "react";
import { Table, Tag, Button, Radio } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import styled from "@emotion/styled";
import { CategoryList } from "utilities/constants";
import { scrollBottom } from "utilities/func";

export default function Search() {
  const selectedPanel = useRef(null);
  const stockList = useSelector((state) => state.stock.stockList);
  const [filterType, setFilterType] = useState("all");

  const fullData = stockList.map((ob) => ({
    ...ob,
    ...CategoryList.find((ob2) => ob.cid === ob2.cid),
    key: uuidv4(),
  }));

  const FilteredByOption = fullData.filter((ob) => {
    if (filterType === "import") return ob.status === "a1";
    if (filterType === "export") return ob.status !== "a1";

    return true;
  });

  const dailyVolume = () =>
    fullData.map((ob) => Number(ob.sold) || 0).reduce((a, b) => a + b, 0);

  // const dailyOut = () =>
  //   fullData.map((ob) => Number(ob.count) || 0).reduce((a, b) => a + b, 0);

  useEffect(() => {
    scrollBottom(selectedPanel, false);
  }, [stockList]);

  return (
    <div id="Search" ref={selectedPanel}>
      <Radio.Group
        options={[
          { label: "全部", value: "all" },
          { label: "入庫", value: "import" },
          { label: "出庫", value: "export" },
        ]}
        className="mb-4"
        onChange={(e) => setFilterType(e.target.value)}
        value={filterType}
        optionType="button"
      />
      <Table
        columns={TableColumns}
        dataSource={FilteredByOption}
        size="small"
        pagination={false}
        style={{ paddingBottom: "45px" }}
      ></Table>

      <Footer>
        <Button type="primary" className="mr-auto" size="medium">
          <Link to="/inventory">盤點庫存</Link>
        </Button>
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
  padding: 0 20px;
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
      if (status === "b1") return <Tag color="lime">售出</Tag>;
      if (status === "b2") return <Tag color="green">折扣</Tag>;
      if (status === "b3") return <Tag color="green">零售</Tag>;
      if (status === "c1") return <Tag color="magenta">破損</Tag>;
      if (status === "c2") return <Tag color="magenta">試喝</Tag>;
      if (status === "c3") return <Tag color="magenta">下架</Tag>;

      return <Tag color="blue">入庫</Tag>;
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
    render: (val) => <div className="tx_right">{val}</div>,
  },
  {
    title: "售價",
    dataIndex: "discount",
    key: "discount",
    render: (price, ob) => (
      <div className="tx_right">
        {ob.discount && ob.discount !== "0" && (
          <div className="fz12 delete">{ob.price}</div>
        )}
        <div className="fz12 bold">{ob.sold}</div>
      </div>
    ),
  },
];

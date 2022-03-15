import React, { useState } from "react";
import { Radio, Button, Spin } from "antd";
import styled from "@emotion/styled";
import { TypeList } from "../utilities/constants";

export default function SellList({ handleAddList, stockList }) {
  const [tabMain, setTabMain] = useState(TypeList[0]);

  let displaySub = [];

  tabMain.sub.forEach((defaultOb) => {
    const arr = stockList.filter((ob2) => ob2.cid === defaultOb.cid);

    if (arr.length === 0) {
      displaySub.push({ ...defaultOb, count: 0, expiry: "" });
    } else {
      const addDetail = arr.map((ob) => ({ ...defaultOb, ...ob }));
      displaySub.push(...addDetail);
    }
  });

  return (
    <Root>
      <Radio.Group
        className="mainTab"
        size="large"
        onChange={(e) => setTabMain(e.target.value)}
        value={tabMain}
        buttonStyle="solid"
      >
        {TypeList.map((item) => (
          <Radio.Button key={item.type} value={item}>
            {item.type}
          </Radio.Button>
        ))}
      </Radio.Group>

      <Spin spinning={stockList.length === 0}>
        <div className="subTab">
          {displaySub.map((item) => (
            <Button
              disabled={item.count === 0}
              key={item.cid + item.expiry}
              size="large"
              onClick={() =>
                handleAddList({
                  ...item,
                  type: tabMain.type,
                })
              }
            >
              <div className="subBtn">
                <span className={item.count === 0 ? "count error" : "count"}>
                  {item.count}瓶
                </span>
                <span className="mr-8"></span>
                <span className="mr-auto">{item.cat}</span>
                <span className="price">
                  <small className="expiry">{item.expiry.substring(5)}</small>
                  {item.price} 元
                </span>
              </div>
            </Button>
          ))}
        </div>
      </Spin>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  background-color: #eee;

  .mainTab,
  .subTab {
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .count {
    border-radius: 5px;
    background-color: #1f9b1f;
    color: #fff;
    padding: 0 6px;
  }
  .error {
    background-color: #c82424;
  }

  .price {
    display: flex;
    line-height: 1;
    flex-direction: column;
    .expiry {
      font-size: 10px;
      margin-top: -3px;
      margin-bottom: 3px;
      color: #888;
    }
  }

  .subBtn {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
`;

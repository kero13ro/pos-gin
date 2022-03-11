import React, { useState } from "react";
import { Radio, Button } from "antd";
import styled from "@emotion/styled";
import { StockList, TypeList } from "../utilities/constants";

export default function SellList({ handleAddList, stockList }) {
  const [tabMain, setTabMain] = useState(TypeList[0]);

  const displayList = tabMain.sub.map((item) => {
    return {
      ...item,
      inventory: stockList.find((sk) => sk.cid === item.cid)?.count || 0,
    };
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

      <div className="subTab">
        {displayList.map((item) => (
          <Button
            disabled={item.inventory === 0}
            key={item.cid}
            size="large"
            onClick={() =>
              handleAddList({
                ...item,
                type: tabMain.type,
              })
            }
          >
            <div className="flex">
              <span className="mr-auto">{item.cat}</span>
              <span className="mr-8">{item.price} 元</span>
              <span
                className={
                  item.inventory === 0 ? "inventory error" : "inventory"
                }
              >
                {item.inventory}瓶
              </span>
            </div>
          </Button>
        ))}
      </div>
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

  .inventory {
    border-radius: 5px;
    background-color: #1f9b1f;
    color: #fff;
    padding: 0 6px;
  }
  .error {
    background-color: #c82424;
  }
`;

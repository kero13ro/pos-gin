import React, { useState } from "react";
import { Radio, Button } from "antd";
import styled from "@emotion/styled";
import { TypeList } from "utilities/constants";

export default function StockList({ handleAddList }) {
  const [tabMain, setTabMain] = useState(TypeList[0]);

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
        {tabMain.sub.map((item) => (
          <Button
            key={item.cid}
            className="flex"
            size="large"
            onClick={() =>
              handleAddList({
                ...item,
                type: tabMain.type,
              })
            }
          >
            <span className="mr-auto">{item.cat}</span>
            <span>{item.price} 元</span>
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
`;

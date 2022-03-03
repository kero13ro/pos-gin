import React from "react";
import { Tabs, Radio, Space } from "antd";

const { TabPane } = Tabs;

export default function RootTab() {
  // const [tabPosition, setfirst] = useState("1");
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </>
  );
}

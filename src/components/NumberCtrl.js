import React from "react";
import { InputNumber, Button } from "antd";

export default function NumberCtrl({ count, onChange }) {
  return (
    <div id="NumberCtrl">
      <Button type="primary" size="small">
        -
      </Button>
      <InputNumber min={1} max={20} value={count} onChange={onChange} />
      <Button type="primary" size="small">
        +
      </Button>
    </div>
  );
}

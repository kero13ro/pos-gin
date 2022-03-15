import React from "react";
import { InputNumber, Button } from "antd";

export default function NumberCtrl({ count, onChange, onAdd, onMinus }) {
  return (
    <div id="NumberCtrl">
      <Button type="primary" size="small" onClick={onMinus}>
        -
      </Button>
      <InputNumber min={1} max={20} value={count} onChange={onChange} />
      <Button type="primary" size="small" onClick={onAdd}>
        +
      </Button>
    </div>
  );
}

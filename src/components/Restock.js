import React, { useRef } from "react";
import moment from "moment";
import { Button, DatePicker, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import StockList from "./StockList";
import ConfirmModal from "./ConfirmModal";
import { MutateStock } from "../utilities/axios";
import { sumPrice, scrollBottom } from "../utilities/func";
import { useImmer } from "use-immer";

const Restock = () => {
  const [stock, updateStock] = useImmer([]);
  const selectedPanel = useRef(null);

  const handleAddList = (item) => {
    const fullItem = {
      ...item,
      count: 5,
      expiry: moment().add(7, "day"),
    };

    updateStock([...stock, fullItem]);

    scrollBottom(selectedPanel);
  };

  const handleSubmit = async () => {
    const list = stock.map((item) => ({
      ...item,
      isStock: 1,
      expiry: item.expiry.format("YYYY/MM/DD"),
    }));

    return MutateStock(list);
  };

  return (
    <div id="Restock">
      <StockList handleAddList={handleAddList} />

      <div className="selectedPanel" ref={selectedPanel}>
        {stock.map((item, index) => (
          <div className="restockList" key={index}>
            <div className="flex-center">
              <b className="mr-8">{item.type}</b>
              {item.cat}
              <Button
                className="deleteBtn"
                shape="circle"
                onClick={() => {
                  updateStock(stock.filter((_, index2) => index !== index2));
                }}
                danger
                icon={<CloseOutlined />}
                size="small"
              />
            </div>
            <div className="info">
              即期日期：
              <DatePicker
                value={item.expiry}
                onChange={(date) =>
                  updateStock((draft) => {
                    draft[index].expiry = date;
                  })
                }
              />
              <div className="mr-auto"></div>
              <InputNumber
                min={1}
                max={20}
                value={item.count}
                onChange={(date) =>
                  updateStock((draft) => {
                    draft[index].count = date;
                  })
                }
              />
              <span className="ml-8">瓶</span>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <span>共 </span>
        <span>{stock.length}</span>
        <span>瓶</span>

        <ConfirmModal
          handleSubmit={handleSubmit}
          disabled={!stock.length}
          clearCart={() => updateStock([])}
        >
          {stock.map((item, index) => (
            <div className="previewList" key={index}>
              <div className="mr-auto">{item.label}</div>
              {item.price}元<div className="slash"> / </div>
              {item.cat}
            </div>
          ))}

          <div className="previewSum">{sumPrice(stock)}元</div>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Restock;

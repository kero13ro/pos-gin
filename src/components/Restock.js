import React, { useRef } from "react";
import moment from "moment";
import { Button, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import StockList from "./StockList";
import ConfirmModal from "./ConfirmModal";
import NumberCtrl from "./NumberCtrl";
import { MutateStock } from "../utilities/axios";
import { scrollBottom } from "../utilities/func";
import { useImmer } from "use-immer";

const Restock = () => {
  const [stock, updateStock] = useImmer([]);
  const selectedPanel = useRef(null);

  const handleAddList = (item) => {
    const fullItem = {
      ...item,
      count: 5,
      expiry: moment().add(8, "day"),
    };

    const index = stock.findIndex((ob) => ob.cid === item.cid);

    if (index !== -1) {
      updateStock((draft) => {
        draft[index].count++;
      });
      return;
    }

    updateStock([...stock, fullItem]);

    scrollBottom(selectedPanel);
  };

  const handleSubmit = async () => {
    const list = stock.map((item) => ({
      ...item,
      status: 1,
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
              即期日：
              <DatePicker
                inputReadOnly
                value={item.expiry}
                onChange={(date) =>
                  updateStock((draft) => {
                    draft[index].expiry = date;
                  })
                }
              />
              <div className="mr-auto"></div>
              <NumberCtrl
                count={item.count}
                update={updateStock}
                onAdd={() =>
                  updateStock((draft) => {
                    draft[index].count++;
                  })
                }
                onMinus={() =>
                  updateStock((draft) => {
                    draft[index].count--;
                  })
                }
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
          title="確認進貨"
        >
          {stock.map((item, index) => (
            <div className="previewList" key={index}>
              <div className="mr-auto">{item.label}</div>
              {item.price}元<div className="slash"> / </div>
              <div className="mr-8">{item.cat}</div>x {item.count}
            </div>
          ))}

          <div className="previewSum">
            共
            {stock
              .map((item) => item.count)
              .reduce((prev, curt) => prev + curt, 0)}
            瓶
          </div>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Restock;

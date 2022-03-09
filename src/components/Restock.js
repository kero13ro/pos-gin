import React, { useRef } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { Button, DatePicker, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import StockList from "./StockList";
import ConfirmModal from "./ConfirmModal";
import { axiosIns } from "../utilities/axios";
import { sumPrice, scrollBottom } from "../utilities/func";
import { useImmer } from "use-immer";

const Restock = () => {
  const [cart, updateCart] = useImmer([]);
  const cartPanel = useRef(null);

  const addCart = (item) => {
    const fullItem = {
      ...item,
      count: 5,
      expiryDate: moment().add(7, "day"),
    };

    updateCart([...cart, fullItem]);

    scrollBottom(cartPanel);
  };

  const submitCart = async () => {
    let res;
    const params = {
      date: new Date().toLocaleDateString(),
      time: dayjs().format("HH:mm:ss"),
      cart,
    };
    try {
      res = await axiosIns.post("add", params);
    } catch (error) {
      return Promise.reject(error);
    }

    return Promise.resolve(res);
  };

  return (
    <div id="Restock">
      <StockList addCart={addCart} />

      <div className="cartPanel" ref={cartPanel}>
        {cart.map((item, index) => (
          <div className="restockList" key={index}>
            <div className="flex-center">
              <div className="mr-auto">{item.label}</div>
              {item.price}元<div className="slash"> / </div>
              {item.subName}
              <Button
                className="deleteBtn"
                shape="circle"
                onClick={() => {
                  updateCart(cart.filter((_, index2) => index !== index2));
                }}
                danger
                icon={<CloseOutlined />}
                size="small"
              />
            </div>
            <div className="info">
              即期日期：
              <DatePicker
                value={item.expiryDate}
                onChange={(date) =>
                  updateCart((draft) => {
                    draft[index].expiryDate = date;
                  })
                }
              />
              <div className="mr-auto"></div>
              <InputNumber
                min={1}
                max={20}
                value={item.count}
                onChange={(date) =>
                  updateCart((draft) => {
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
        <span>總金額</span>
        <span>{sumPrice(cart)}</span>
        <span>元</span>

        <span>/ 共 </span>
        <span>{cart.length}</span>
        <span>瓶</span>

        <ConfirmModal
          submitCart={submitCart}
          disabled={!cart.length}
          clearCart={() => updateCart([])}
        >
          {cart.map((item, index) => (
            <div className="previewList" key={index}>
              <div className="mr-auto">{item.label}</div>
              {item.price}元<div className="slash"> / </div>
              {item.subName}
            </div>
          ))}

          <div className="previewSum">{sumPrice(cart)}元</div>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Restock;

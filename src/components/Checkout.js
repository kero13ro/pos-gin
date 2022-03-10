import React, { useState, useRef } from "react";
import moment from "moment";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import StockList from "./StockList";
import ConfirmModal from "./ConfirmModal";
import { axiosIns } from "../utilities/axios";
import { sumPrice, scrollBottom } from "../utilities/func";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const selectedPanel = useRef(null);

  const handleAddList = (item) => {
    setCart([...cart, item]);

    scrollBottom(selectedPanel);
  };

  const handleSubmit = async () => {
    const params = {
      created: moment().format("YY/MM/DDTHH:mm"),
      list: cart,
    };

    return axiosIns.post("addRowsAt?sheetName=check", params);
  };

  return (
    <div id="Checkout">
      <StockList handleAddList={handleAddList} />

      <div className="selectedPanel" ref={selectedPanel}>
        {cart.map((item, index) => (
          <div className="cartList" key={index}>
            <div className="mr-auto">{item.type}</div>
            {item.price}元<div className="slash"> / </div>
            {item.cat}
            <Button
              className="deleteBtn"
              shape="circle"
              onClick={() => {
                setCart(cart.filter((_, index2) => index !== index2));
              }}
              danger
              icon={<CloseOutlined />}
              size="small"
            />
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
          handleSubmit={handleSubmit}
          disabled={!cart.length}
          clearCart={() => setCart([])}
        >
          {cart.map((item, index) => (
            <div className="previewList" key={index}>
              <div className="mr-auto">{item.type}</div>
              {item.price}元<div className="slash"> / </div>
              {item.cat}
            </div>
          ))}

          <div className="previewSum">{sumPrice(cart)}元</div>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Checkout;

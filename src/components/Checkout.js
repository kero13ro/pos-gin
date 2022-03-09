import React, { useState, useRef } from "react";
import ConfirmModal from "./ConfirmModal";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// import { allItems } from "../data/category";
import StockList from "./StockList";
import { axiosIns } from "../utilities/axios";
import dayjs from "dayjs";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const cartPanel = useRef(null);

  const addCart = (item) => {
    setCart([...cart, item]);

    setTimeout(() => {
      cartPanel.current.scrollTo({
        left: 0,
        top: cartPanel.current.scrollHeight,
        behavior: "smooth",
      });
    }, 1);
  };

  const removeCart = (index) => {
    const arr = cart.filter((_, index2) => index !== index2);
    setCart(arr);
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

  const cartSum = () =>
    cart.map((item) => item.price).reduce((prev, curt) => prev + curt, 0);

  return (
    <div id="Checkout">
      <StockList addCart={addCart} />

      <div className="cartPanel" ref={cartPanel}>
        {cart.map((item, index) => (
          <div className="cartList" key={index}>
            <div className="mr-auto">{item.label}</div>
            {item.price}元<div className="slash"> / </div>
            {item.subName}
            <Button
              onClick={() => removeCart(index)}
              type="link"
              danger
              icon={<CloseOutlined />}
              size="small"
            />
          </div>
        ))}
      </div>
      <div className="footer">
        <span>總金額</span>
        <span>{cartSum()}</span>
        <span>元</span>

        <span>/ 共 </span>
        <span>{cart.length}</span>
        <span>瓶</span>

        <ConfirmModal
          submitCart={submitCart}
          disabled={!cart.length}
          clearCart={() => setCart([])}
        >
          {cart.map((item, index) => (
            <div className="previewList" key={index}>
              <div className="mr-auto">{item.label}</div>
              {item.price}元<div className="slash"> / </div>
              {item.subName}
            </div>
          ))}

          <div className="previewSum">{cartSum()}元</div>
        </ConfirmModal>
      </div>
    </div>
  );
};

export default Checkout;

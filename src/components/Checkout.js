import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useImmer } from "use-immer";
import moment from "moment";

import SellList from "./SellList";
import ConfirmModal from "./ConfirmModal";
import { MutateStock, makeBalance } from "../utilities/axios";
import { sumPrice, scrollBottom } from "../utilities/func";

const Checkout = () => {
  const stockListStore = useSelector((state) => state.stock.stockList);
  const sorted = makeBalance(stockListStore);

  const [stockList, updateStockList] = useImmer(sorted);
  const [cart, updateCart] = useImmer([]);
  const selectedPanel = useRef(null);

  const handleAddList = (item) => {
    updateCart((cart) => [...cart, item]);

    updateStockList((list) => {
      list.find((ob) => ob.cid === item.cid && ob.expiry === item.expiry)
        .count--;
    });

    scrollBottom(selectedPanel);
  };

  const handleSubmit = async () => {
    let list = [];

    cart.forEach((item) => {
      const sameExpiry = list.find(
        (ob) => ob.cid === item.cid && ob.expiry === item.expiry
      );

      if (!sameExpiry) {
        list.push({
          ...item,
          count: 1,
          status: 2,
          sold: item.price, // todo
        });
      } else {
        sameExpiry.count++;
      }
    });

    await MutateStock(list);
  };

  return (
    <div id="Checkout">
      <SellList handleAddList={handleAddList} stockList={stockList} />

      <div className="selectedPanel" ref={selectedPanel}>
        {cart.map((item, index) => (
          <div className="restockList" key={index}>
            <div className="flex-center">
              <b className="mr-auto">{item.type}</b>
              {item.price}元<div className="slash"> / </div>
              <div className="mr-8">{item.cat}</div>
              <Button
                className="deleteBtn"
                shape="circle"
                onClick={() => {
                  updateStockList((list) => {
                    list.find((sk) => sk.cid === item.cid).count++;
                  });

                  updateCart(cart.filter((_, index2) => index !== index2));
                }}
                danger
                icon={<CloseOutlined />}
                size="small"
              />
            </div>
            <div className="info">
              即期日：
              {moment(item.expiry).format("M/DD")}
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
          handleSubmit={handleSubmit}
          disabled={!cart.length}
          clearCart={() => updateCart([])}
          title="結帳"
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

import React, { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { connect } from "react-redux";
import moment from "moment";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import StatusButton from "components/StatusButton";
import DiscountDropdown from "components/DiscountDropdown";

import SellList from "components/SellList";
import ConfirmModal from "components/ConfirmModal";
import { MutateStock, makeBalance } from "utilities/axios";
import { sumPrice, scrollBottom } from "utilities/func";

const Checkout = ({ stockListStore }) => {
  // 暫存的目前庫存，若確定送出後再更新 store
  const [stockList, updateStockList] = useImmer([]);

  // 暫存的結帳清單
  const [cart, updateCart] = useImmer([]);
  const selectedPanel = useRef(null);

  useEffect(() => {
    const sorted = makeBalance(stockListStore);

    updateStockList(sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockListStore]);

  const handleAddList = (item) => {
    updateCart((cart) => [
      ...cart,
      {
        ...item,
        status: "b1",
        discount: 0,
        sold: item.price,
      },
    ]);

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
        (ob) =>
          ob.cid === item.cid &&
          ob.expiry === item.expiry &&
          ob.status === item.status
      );

      if (!sameExpiry) {
        list.push({ ...item, count: 1 });
      } else {
        sameExpiry.count++;
      }
    });

    await MutateStock(list);
  };

  const getActualPrice = ({ status, price, sold }) => {
    if (status === "b1") return <>{price} 元</>;

    return (
      <>
        <div className="delete">{price}</div>
        <div className="tx_bold">{sold} 元</div>
      </>
    );
  };

  return (
    <div id="Checkout">
      <SellList handleAddList={handleAddList} stockList={stockList} />

      <div className="selectedPanel" ref={selectedPanel}>
        {cart.map((item, index) => (
          <div className="restockList" key={index}>
            <div className="flex-center">
              <b className="mr-8">{item.type}</b>
              <div className="mr-auto gray">{item.cat}</div>
              {getActualPrice(item)}

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
              <div className="mr-auto">
                <StatusButton
                  item={item}
                  updateCart={updateCart}
                  index={index}
                />
                {item.status === "b2" && (
                  <DiscountDropdown
                    item={item}
                    updateCart={updateCart}
                    index={index}
                  />
                )}
              </div>
              <div className="">
                即期日：
                {moment(item.expiry, "YYYY/MM/DD").format("M/DD")}
              </div>
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
              <b className="mr-8">{item.type}</b>
              <div className="mr-auto gray">{item.cat}</div>
              {getActualPrice(item)}
            </div>
          ))}

          <div className="previewSum">
            <span className="mr-8">應收金額</span>
            {sumPrice(cart)}元
          </div>
        </ConfirmModal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stockListStore: state.stock.stockList,
});

export default connect(mapStateToProps)(Checkout);

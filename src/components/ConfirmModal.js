import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, message } from "antd";
import { FetchStock } from "../utilities/axios";
import { updateStock } from "../store/slice/stock";

export default function ConfirmModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      await props.handleSubmit();

      FetchStock()
        .then((data) => dispatch(updateStock(data)))
        .catch((err) => console.log(err));

      message.success(props.title + "成功");
    } catch (error) {
      message.info("伺服器錯誤: " + error);
    }

    setVisible(false);
    setConfirmLoading(false);
    props.clearCart();
  };

  return (
    <>
      <Button
        type="primary"
        disabled={props.disabled}
        onClick={() => setVisible(true)}
      >
        確認 {props.title}
      </Button>
      <Modal
        title={"確認" + props.title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
        okText="確認"
        cancelText="取消"
      >
        {props.children}
      </Modal>
    </>
  );
}

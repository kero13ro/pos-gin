import React from "react";
import { Modal, Button, message } from "antd";

export default function ConfirmModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      await props.handleSubmit();
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
        {props.title || "確認結帳"}
      </Button>
      <Modal
        title={props.title || "確認結帳"}
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

import React from "react";
import { Modal, Button } from "antd";

export default function ConfirmModal(props) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    await props.submitCart();

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
        確認結帳
      </Button>
      <Modal
        title="確認送單"
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

import { Button, Popconfirm } from "antd";
import React, { useState } from "react";

export function ConfirmModal(props) {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    props.confirmDeletingTask();
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Popconfirm
      title={props.questionTitle}
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
      //disabled={props.currentTask ? false : true}
    >
      <Button type="default" onClick={showPopconfirm}>
        {props.buttonTitle}
      </Button>
    </Popconfirm>
  );
}
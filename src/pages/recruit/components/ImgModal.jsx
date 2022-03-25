import React from 'react';
import { Modal } from 'antd';

const UserModal = (props) => {
  const { visible, closeHandler, onFinish, record } = props;
  return (
    <div>
      <Modal
        title={`招领图片`}
        visible={visible}
        onOk={onFinish}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        {record.Rec_img ? <img style={{ width: 450 }} src={record.Rec_img} /> : '暂无招领图片'}
      </Modal>
    </div>
  );
};

export default UserModal;

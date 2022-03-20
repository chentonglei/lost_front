import React from 'react';
import { Modal } from 'antd';

const UserModal = (props) => {
  const { visible, closeHandler, onFinish, record } = props;
  return (
    <div>
      <Modal
        title={`${record.Re_name}的认证信息`}
        visible={visible}
        onOk={onFinish}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        {record.Re_img !== '' ? <img style={{ width: 450 }} src={record.Re_img} /> : '暂无'}
      </Modal>
    </div>
  );
};

export default UserModal;

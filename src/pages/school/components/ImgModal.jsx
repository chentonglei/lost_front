import React from 'react';
import { Modal } from 'antd';

const UserModal = (props) => {
  const { visible, closeHandler, onFinish, record } = props;
  return (
    <div>
      <Modal
        title={`学校认证信息`}
        visible={visible}
        onOk={onFinish}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        {record.Sch_documents ? (
          <img style={{ width: 450 }} src={record.Sch_documents} />
        ) : (
          '暂无认证图片'
        )}
      </Modal>
    </div>
  );
};

export default UserModal;

import React, { useEffect } from 'react';
import { Descriptions, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const InformationModal = (props) => {
  const { visible, record, closeHandler, onFinish } = props;
  return (
    <div>
      <Modal
        title="归还信息"
        visible={visible}
        onOk={onFinish}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        {record ? (
          <Descriptions bordered>
            <Descriptions.Item label="失主id" span={3}>
              {record.Return_people_id}
            </Descriptions.Item>
            <Descriptions.Item label="失主电话" span={3}>
              {record.Return_people_phone}
            </Descriptions.Item>
            <Descriptions.Item label="失主姓名" span={3}>
              {record.Return_people_name}
            </Descriptions.Item>
            <Descriptions.Item label="归还时间" span={3}>
              {record.Return_time}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          '暂无归还信息'
        )}
      </Modal>
    </div>
  );
};

export default InformationModal;

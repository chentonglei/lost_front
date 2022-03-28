import React, { useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const InformationModal = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { visible, closeHandler, onFinish, record } = props;
  useEffect(() => {
    /* 解决点edit报错 异步 跟生命周期有关 */
    form.setFieldsValue({
      ...record,
    });
  }, [visible]);
  const onOk = () => {
    console.log('okokoko');
    form.submit();
  };
  return (
    <div>
      <Modal
        title={record.title ? '修改系统简介' : '添加系统简介'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="问题"
            name="Intr_question"
            rules={[{ required: true, message: '请输入问题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="回答"
            name="Intr_answer"
            rules={[{ required: true, message: '请输入回答' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InformationModal;

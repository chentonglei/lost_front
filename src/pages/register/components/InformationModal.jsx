import React, { useEffect } from 'react';
import { Modal, Form, Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const InformationModal = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { visible, record, closeHandler, onFinish } = props;
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
        title={`${record.Re_name}的个人信息`}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender /* 预渲染 解决报错 */
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="账号" name="Re_id" rules={[{ required: true, message: '请输入账号' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="Re_name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="Re_email">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="Re_sex">
            <Select allowClear>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item label="生日" name="Re_age">
            <Input />
          </Form.Item>
          <Form.Item label="电话" name="Re_telephone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InformationModal;

import React, { useState, useEffect } from 'react';
import { message, Card } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useModel, request } from 'umi';
import * as services from './service';
const formRef = {};
const BaseView = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  /*  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  }); */

  const handleFinish = async (values) => {
    values.Re_power = 'admin';
    const data = await services.lisettings(values);
    if (data.result === 'true') {
      message.success('更新基本信息成功');
      setInitialState({ ...initialState, currentUser: values });
      console.log(initialState.currentUser);
    } else message.error('更新基本信息失败');
  };

  return (
    <PageContainer>
      <>
        <Card>
          <ProForm
            layout="vertical"
            formRef={formRef}
            onFinish={handleFinish}
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: 600,
            }}
            submitter={{
              searchConfig: {
                submitText: '修改',
              },
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{ ...initialState.currentUser }}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              name="Re_id"
              label="账号"
              disabled
              /*  rules={[
                {
                  required: true,
                  message: '请输入您的账号!',
                },
              ]} */
            />
            <ProFormText
              width="md"
              name="Re_name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请输入您的姓名!',
                },
              ]}
            />
            <ProFormText width="md" name="Re_email" label="邮箱" />
            <ProFormSelect
              width="sm"
              name="Re_sex"
              label="性别"
              options={[
                {
                  label: '男',
                  value: '男',
                },
                {
                  label: '女',
                  value: '女',
                },
              ]}
            />
            <ProFormDatePicker width="md" name="Re_age" label="年龄" placeholder="年龄" />
            <ProFormText width="md" name="Re_telephone" label="电话" />
          </ProForm>
        </Card>
      </>
    </PageContainer>
  );
};

export default BaseView;

import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';

import InformationModal from './components/InformationModal';
import ImgModal from './components/ImgModal';

const { Option } = Select;
const actionRef = {};

const IntroductionList = () => {
  // 删除记录
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleOk = async (record) => {
    setIsModalVisible(false);
    console.log(record);
    const msg = await services.setting(record);
    console.log(msg);
    actionRef.current.reload();
    if (msg.result === 'true') {
      message.success('修改成功');
      actionRef.current.reload();
    } else message.error(msg.msg);
  };
  const addmessage = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: '介绍id',
      dataIndex: 'Intr_id',
    },
    {
      title: '提问内容',
      dataIndex: 'Intr_question',
    },
    {
      title: '回答内容',
      dataIndex: 'Intr_answer',
    },
    /* {
      title: '操作（初始密码为123456）',
      hideInSearch: true, // 在搜索里屏蔽
      render: (_, record) => [
        <>
          <a onClick={() => showinformation(record)}>修改信息</a>
          &nbsp;&nbsp;
          <Popconfirm
            key="update"
            title="是否确认初始化"
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>初始化密码</a>
          </Popconfirm>
          {record.Re_status === '审核通过' ? (
            <>
              &nbsp;&nbsp;
              <Popconfirm
                key="new"
                title="是否确认初始化"
                onConfirm={() => confirm2(record)}
                okText="Yes"
                cancelText="No"
              >
                <a>初始化认证</a>
              </Popconfirm>
            </>
          ) : (
            ''
          )}
          {record.Re_status === '审核中' ? (
            <>
              &nbsp;&nbsp;
              <a onClick={() => tongyi(record)}>通过</a>&nbsp;&nbsp;
              <a onClick={() => jujue(record)}>拒绝</a>
            </>
          ) : (
            ''
          )}
          {record.Re_status !== '未提交认证信息' ? (
            <>
              &nbsp;&nbsp;
              <a onClick={() => showimg(record)}>查看认证信息</a>
            </>
          ) : (
            ''
          )}
        </>,
      ],
    },*/
  ];
  return (
    <>
      <ProTable
        headerTitle="系统使用介绍信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Re_id"
        options={false}
        /*         rowSelection={rowSelection} */
        /* search={false} */
        toolBarRender={() => [
          <Button key="add" onClick={() => addmessage()}>
            <a>添加系统简介</a>
          </Button>,
        ]}
        request={(params) => services.getlist(params)}
      />
      <InformationModal // component 下 弹窗
        visible={isModalVisible} // 可见型
        closeHandler={handleCancel}
        onFinish={handleOk}
      />
    </>
  );
};

export default IntroductionList;

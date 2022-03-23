import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';

import InformationModal from './components/InformationModal';

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
    if (regions.title) {
      record.Intr_id = regions.Intr_id;
      const msg = await services.update(record);
      if (msg.result === 'true') {
        message.success('修改成功');
      } else message.error('修改成功，请重试');
    } else {
      const msg = await services.add(record);
      if (msg.result === 'true') {
        message.success('添加成功');
      } else message.error('添加成功，请重试');
    }
    actionRef.current.reload();
  };
  const addmessage = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const update = (record) => {
    record.title = '修改';
    setIsModalVisible(true);
    setRegions(record);
  };
  const confirm = async (data) => {
    const msg = await services.del(data);
    if (msg.result === 'true') {
      message.success('删除成功');
    } else message.error('删除失败，请重试');
    actionRef.current.reload();
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
    {
      title: '操作',
      hideInSearch: true, // 在搜索里屏蔽
      render: (_, record) => [
        <>
          <a onClick={() => update(record)}>修改</a>
          &nbsp;&nbsp;
          <Popconfirm
            key="delete"
            title="是否确认删除"
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </>,
      ],
    },
  ];
  return (
    <>
      <ProTable
        headerTitle="系统使用介绍信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Intr_id"
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
        record={regions}
      />
    </>
  );
};

export default IntroductionList;

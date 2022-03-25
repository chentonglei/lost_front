import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';
import InformationModal from './components/InformationModal';
import ImgModal from './components/ImgModal';
const actionRef = {};
const color = {
  已找到: 'success',
  未找到: 'error',
};
const { Option } = Select;
const IntroductionList = () => {
  // 删除记录
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    // selectedRowKeys,
    onChange: (_selectedRowKeys, _selectedRows) => {
      setSelectedRowKeys(_selectedRowKeys);
      setSelectedRows(_selectedRows);
    },
  };
  const showreturn = async (record) => {
    setIsModalVisible(true);
    const msg = await services.showreturn(record);
    setRegions(msg);
  };
  const showimg = async (record) => {
    setIsModalVisible2(true);
    setRegions(record);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const showcomment = (record) => {
    history.push({ pathname: 'lost/comment', state: { body: record } });
  };
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.error('请勾选复选框!');
    }
    const body = {};
    body.array = selectedRowKeys;
    const msg = await services.del(body);
    if (msg.result === 'true') message.success(msg.msg);
    else message.error('删除失败!');
    actionRef.current.reloadAndRest();
  };
  const columns = [
    {
      title: '失物id',
      dataIndex: 'Lost_id',
    },
    {
      title: '失物地点',
      dataIndex: 'Lost_where',
    },
    {
      title: '失物内容',
      dataIndex: 'Lost_content',
    },
    {
      title: '失物时间',
      dataIndex: 'Lost_time',
    },
    {
      title: '失物状态',
      dataIndex: 'Lost_status',
      render: (_, record) => [
        <Tag color={color[record.Lost_status]} key={'tag'}>
          {record.Lost_status}
        </Tag>,
      ],
      renderFormItem: () => {
        return (
          <Select allowClear>
            <Option value="已找到">已找到</Option>
            <Option value="未找到">未找到</Option>
          </Select>
        );
      },
    },
    {
      title: '发布人id',
      dataIndex: 'Lost_people_id',
    },
    {
      title: '发布人姓名',
      dataIndex: 'Lost_people_name',
    },
    {
      title: '发布人电话',
      dataIndex: 'Lost_people_phone',
    },
    {
      title: '发布时间',
      dataIndex: 'Lost_send_time',
    },
    {
      title: '操作',
      hideInSearch: true, // 在搜索里屏蔽
      render: (_, record) => [
        <>
          <a onClick={() => showimg(record)}>查看失物图片</a>
          &nbsp;&nbsp;
          <a onClick={() => showreturn(record)}>查看归还信息</a>
          &nbsp;&nbsp;
          <a onClick={() => showcomment(record)}>查看评论信息</a>
        </>,
      ],
    },
  ];
  return (
    <>
      <ProTable
        headerTitle="失物信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Lost_id"
        options={false}
        rowSelection={rowSelection}
        /* search={false} */
        tableAlertOptionRender={() => (
          <Popconfirm
            key="makesure"
            title="确定要删除以下失物信息吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete()}
          >
            <a>删除失物</a>
          </Popconfirm>
        )}
        request={(params) => services.getlist(params)}
      />
      <InformationModal // component 下 弹窗
        visible={isModalVisible} // 可见型
        closeHandler={handleCancel}
        onFinish={handleOk}
        record={regions}
      />
      <ImgModal // component 下 弹窗
        visible={isModalVisible2} // 可见型
        closeHandler={handleCancel2}
        onFinish={handleOk2}
        record={regions}
      />
    </>
  );
};

export default IntroductionList;

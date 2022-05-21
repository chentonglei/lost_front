import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history, useModel } from 'umi';
import * as services from './service';
import InformationModal from './components/InformationModal';
import ImgModal from './components/ImgModal';

const actionRef = {};
const color = {
  审核中: 'processing',
  已归还: 'success',
  审核拒绝: 'error',
};
const { Option } = Select;
const IntroductionList = () => {
  // 删除记录
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { initialState, setInitialState } = useModel('@@initialState');
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
  const showcomment = (record) => {
    history.push({ pathname: 'recruit/comment', state: { body: record } });
  };
  const tongyi = async (record) => {
    // eslint-disable-next-line no-param-reassign
    record.result = 'true';
    const msg = await services.doit(record);
    if (msg.result === 'true') message.success('已通过');
    else message.error('通过失败');
    actionRef.current.reload();
  };
  const jujue = async (record) => {
    // eslint-disable-next-line no-param-reassign
    record.result = 'false';
    const msg = await services.doit(record);
    if (msg.result === 'true') message.success('已拒绝');
    else message.error('拒绝失败');
    actionRef.current.reload();
  };
  const columns = [
    {
      title: '招领id',
      dataIndex: 'Rec_id',
    },
    {
      title: '拾取地点',
      dataIndex: 'Rec_where',
    },
    {
      title: '拾取内容',
      dataIndex: 'Rec_content',
    },
    {
      title: '招领时间',
      dataIndex: 'Rec_time',
    },
    {
      title: '招领状态',
      dataIndex: 'Rec_status',
      render: (_, record) => [
        <Tag color={color[record.Rec_status]} key={'tag'}>
          {record.Rec_status}
        </Tag>,
      ],
      renderFormItem: () => {
        return (
          <Select allowClear>
            <Option value="审核中">审核中</Option>
            <Option value="审核拒绝">审核拒绝</Option>
            <Option value="已归还">已归还</Option>
            <Option value="未归还">未归还</Option>
          </Select>
        );
      },
    },
    {
      title: '发布人id',
      dataIndex: 'Rec_people_id',
    },
    {
      title: '发布人姓名',
      dataIndex: 'Rec_people_name',
    },
    {
      title: '发布人电话',
      dataIndex: 'Rec_people_phone',
    },
    {
      title: '发布时间',
      dataIndex: 'Rec_send_time',
    },
    {
      title: '操作',
      hideInSearch: true, // 在搜索里屏蔽
      render: (_, record) => [
        <>
          <a onClick={() => showimg(record)}>招领图片</a>
          &nbsp;&nbsp;
          <a onClick={() => showreturn(record)}>归还信息</a>
          &nbsp;&nbsp;
          <a onClick={() => showcomment(record)}>评论信息</a>
          {record.Rec_status === '审核中' ? (
            <>
              &nbsp;&nbsp;
              <a onClick={() => tongyi(record)}>通过</a>&nbsp;&nbsp;
              <a onClick={() => jujue(record)}>拒绝</a>
            </>
          ) : (
            ''
          )}
        </>,
      ],
    },
  ];
  return (
    <>
      <ProTable
        headerTitle="招领信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Rec_id"
        options={false}
        rowSelection={rowSelection}
        /* search={false} */
        tableAlertOptionRender={() => (
          <Popconfirm
            key="makesure"
            title="确定要删除以下招领信息吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete()}
          >
            <a>删除招领</a>
          </Popconfirm>
        )}
        request={(params) =>
          services.getlist({ ...params, school_id: initialState.currentUser.Re_school_id })
        }
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

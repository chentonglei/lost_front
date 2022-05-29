import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';

import ImgModal from './components/ImgModal';

const { Option } = Select;
const color = {
  审核中: 'processing',
  审核通过: 'success',
  审核拒绝: 'error',
};
const actionRef = {};

const IntroductionList = () => {
  // 删除记录
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const showimg = (record) => {
    setRegions(record);
    console.log(record);
    setIsModalVisible2(true);
  };
  const confirm = async (data) => {
    const msg = await services.del(data);
    if (msg.result === 'true') {
      message.success('删除成功');
    } else message.error('删除失败，请重试');
    actionRef.current.reload();
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
      title: '学校id',
      dataIndex: 'Sch_id',
    },
    {
      title: '学校名',
      dataIndex: 'Sch_name',
    },
    {
      title: '申请时间',
      dataIndex: 'Sch_time',
    },
    {
      title: '状态',
      dataIndex: 'Sch_status',
      render: (_, record) => [
        <Tag color={color[record.Sch_status]} key={'tag'}>
          {record.Sch_status}
        </Tag>,
      ],
      renderFormItem: () => {
        return (
          <Select allowClear>
            <Option value="审核中">审核中</Option>
            <Option value="审核通过">审核通过</Option>
            <Option value="审核拒绝">审核拒绝</Option>
          </Select>
        );
      },
    },
    {
      title: '申请人id',
      dataIndex: 'Sch_applicant_id',
    },
    {
      title: '申请人',
      dataIndex: 'Sch_applicant_name',
    },
    {
      title: '操作',
      hideInSearch: true, // 在搜索里屏蔽
      render: (_, record) => [
        <>
          <a onClick={() => showimg(record)}>查看认证信息</a>&nbsp;&nbsp;
          {record.Sch_status === '审核通过' ? (
            <Popconfirm
              key="delete"
              title="是否确认踢出"
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <a>踢出系统</a>
            </Popconfirm>
          ) : (
            ''
          )}
          {record.Sch_status === '审核中' ? (
            <>
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
        headerTitle="系统使用介绍信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        options={false}
        /*         rowSelection={rowSelection} */
        /* search={false} */
        request={(params) => services.getlist(params)}
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

import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';

import InformationModal from './components/InformationModal';
import ImgModal from './components/ImgModal';

const { Option } = Select;
const actionRef = {};

const Userlist = () => {
  // 删除记录
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '评论id',
      dataIndex: 'Com_id',
    },
    {
      title: '评论内容',
      dataIndex: 'Com_do_message',
    },
    {
      title: '评论人',
      dataIndex: 'Com_do_name',
    },
    {
      title: '评论人id',
      dataIndex: 'Com_do_id',
    },
    {
      title: '评论时间',
      dataIndex: 'Com_do_time',
    },
    {
      title: '被评论人',
      dataIndex: 'Com_be_name',
    },
    {
      title: '被评论人id',
      dataIndex: 'Com_be_id',
    },
    {
      title: '状态',
      dataIndex: 'Re_status',
      hideInSearch: true, // 在搜索里屏蔽
    },
    {
      title: '所属学校',
      dataIndex: 'Re_school_name',
    },
    {
      title: '所属学校id',
      dataIndex: 'Re_school_id',
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
        headerTitle="用户信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Re_id"
        options={false}
        rowSelection={rowSelection}
        /* search={false} */
        request={(params) => services.getlist(params)}
      />
      {/*  <InformationModal // component 下 弹窗
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
      /> */}
    </>
  );
};

export default Userlist;

import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import * as services from './service';
const actionRef = {};
const color = {
  已找到: 'success',
  未找到: 'error',
};
const { Option } = Select;
const CommentList = (props) => {
  // 删除记录
  const { body } = props.location.state;
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
  const handleDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.error('请勾选复选框!');
    }
    const body = {};
    body.array = selectedRowKeys;
    const msg = await services.delcomment(body);
    if (msg.result === 'true') message.success(msg.msg);
    else message.error('删除失败!');
    actionRef.current.reloadAndRest();
  };
  const columns = [
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
  ];
  return (
    <>
      <ProTable
        headerTitle="评论信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Com_id"
        options={false}
        rowSelection={rowSelection}
        /* search={false} */
        tableAlertOptionRender={() => (
          <Popconfirm
            key="makesure"
            title="确定要删除以下评论信息吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete()}
          >
            <a>删除失物</a>
          </Popconfirm>
        )}
        request={(params) =>
          services.getcommentlist({ ...params, Com_type_id: body.Lost_id, Com_type: '失物' })
        }
      />
    </>
  );
};

export default CommentList;

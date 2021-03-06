import React, { useState } from 'react';
import { Button, Popconfirm, Alert, message, Cascader, Form, Select, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history, useModel } from 'umi';
import * as services from './service';

import InformationModal from './components/InformationModal';
import ImgModal from './components/ImgModal';
import ExcelImportButton from './components/ExcelImportButton';
import ExcelImportModal from './components/ExcelImportModal';
import { set } from 'lodash';

const { Option } = Select;
const color = {
  审核中: 'processing',
  审核通过: 'success',
  审核拒绝: 'error',
  未提交: 'geekblue',
};
const actionRef = {};
const BanSongSourceKeyMap = {
  账号: `Re_id`,
  姓名: 'Re_name',
};
const Userlist = () => {
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
  const handleOk = async (record) => {
    record.Re_power = 'user';
    setIsModalVisible(false);
    console.log(record);
    const msg = await services.setting(record);
    console.log(msg);
    actionRef.current.reload();
    if (msg.result === 'true') {
      message.success('修改成功');
    } else message.error(msg.msg);
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
  const showinformation = (record) => {
    setIsModalVisible(true);
    setRegions(record);
  };
  const confirm = async (data) => {
    const msg = await services.initpwd(data);
    if (msg.result === 'true') {
      message.success('初始化成功');
    } else message.error(msg.msg);
  };
  const confirm2 = async (data) => {
    const msg = await services.initCertification(data);
    if (msg.result === 'true') {
      message.success('初始化成功');
    } else message.error(msg.msg);
    actionRef.current.reload();
  };
  const showimg = (record) => {
    setIsModalVisible2(true);
    setRegions(record);
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
      title: '账号',
      dataIndex: 'Re_id',
    },
    {
      title: '姓名',
      dataIndex: 'Re_name',
    },
    {
      title: '性别',
      dataIndex: 'Re_sex',
      renderFormItem: () => {
        return (
          <Select allowClear>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        );
      },
    },
    {
      title: '邮箱',
      dataIndex: 'Re_email',
      hideInSearch: true, // 在搜索里屏蔽
    },
    {
      title: '生日',
      dataIndex: 'Re_age',
      hideInSearch: true, // 在搜索里屏蔽
    },
    {
      title: '电话',
      dataIndex: 'Re_telephone',
    },
    {
      title: '权限',
      dataIndex: 'Re_power',
      hideInSearch: true, // 在搜索里屏蔽
    },
    {
      title: '状态',
      dataIndex: 'Re_status',
      render: (_, record) => [
        <Tag color={color[record.Re_status]} key={'tag'}>
          {record.Re_status}
        </Tag>,
      ],
      renderFormItem: () => {
        return (
          <Select allowClear>
            <Option value="审核中">审核中</Option>
            <Option value="审核通过">审核通过</Option>
            <Option value="审核拒绝">审核拒绝</Option>
            <Option value="未提交">未提交</Option>
          </Select>
        );
      },
    },
    {
      title: '所属学校',
      dataIndex: 'Re_school_name',
    },
    {
      title: '所属学校id',
      dataIndex: 'Re_school_id',
    },

    {
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
          {record.Re_status !== '未提交' ? (
            <>
              &nbsp;&nbsp;
              <a onClick={() => showimg(record)}>查看认证信息</a>
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
        headerTitle="用户信息表"
        onReset={() => setRegions([])}
        actionRef={actionRef}
        columns={columns}
        rowKey="Re_id"
        options={false}
        rowSelection={rowSelection}
        /* search={false} */
        toolBarRender={() => [
          <Alert
            message="请下载模板文件进行导入；导入文件格式为.xls或xlsx,字段全是必填。信息不超过五百条超过和重复部分将自动截取。"
            type="warning"
            key="showinfo"
          />,
          <Button key="href">
            <a
              href="http://testcdn.iot.evideocloud.com.cn/song-source/20220521/%E6%89%B9%E9%87%8F%E5%AE%A1%E6%A0%B8%E6%A8%A1%E6%9D%BF.xls"
              download
            >
              批量审核模板下载
            </a>
          </Button>,
          <ExcelImportButton
            key="into"
            KeyMap={BanSongSourceKeyMap}
            reload={() => actionRef.current.reload()}
            saveService={services.doits}
            ExcelImportModal={ExcelImportModal}
          >
            批量审核导入
          </ExcelImportButton>,
        ]}
        tableAlertOptionRender={() => (
          <Popconfirm
            key="makesure"
            title="确定要删除以下用户吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => handleDelete()}
          >
            <a>删除用户</a>
          </Popconfirm>
        )}
        request={(params) =>
          services.getlist({ ...params, Re_school_id: initialState.currentUser.Re_school_id })
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

export default Userlist;

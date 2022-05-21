import React, { useState, useEffect } from 'react';
import { message, Modal, Table, Select, Cascader, Form } from 'antd';

const { Column } = Table;

const ExcelImportModal = ({
  visible,
  onCancel,
  excelData,
  KeyMap,
  setExcelData,
  reload,
  saveService,
  form,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    // 将必填字段为空的数据过滤掉
    console.log(excelData);
    const mustData = excelData.filter(
      (record) => !['Re_id', 'Re_name'].find((item) => record[item] === ''),
    );
    const obj = {};
    const mustData2 = [];
    for (let i = 0; i < mustData.length; i++) {
      if (!obj[mustData[i].Re_id]) {
        mustData2.push(mustData[i]);
        obj[mustData[i].Re_id] = true;
      }
    }
    setExcelData(mustData2.slice(0, 500));
  }, []);
  // 确认保存
  const onConfirm = async () => {
    setConfirmLoading(true);
    /*   const song_list = [];
    for (let i = 0; i < excelData.length; i++) {
      // eslint-disable-next-line no-const-assign
      song_list.push(excelData[i].song_id_list);
    }
    const song = {
      region_code: regions[0],
      song_id_list: song_list,
    };
    const { data } = await saveService(song);
    if (data.errorcode === 0) {
      message.success('添加成功！');
    } */
    setConfirmLoading(false);
    reload();
    onCancel();
  };
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={`请确认导入数据共${excelData.length}条`}
      width={500}
      confirmLoading={confirmLoading}
      onOk={onConfirm}
    >
      <Table
        dataSource={excelData}
        rowKey={(record, index) => index}
        size="small"
        style={{ marginTop: '10px' }}
      >
        {Object.keys(KeyMap).map((key) => (
          <Column key={key} title={key} dataIndex={KeyMap[key]} ellipsis />
        ))}
      </Table>
    </Modal>
  );
};

export default ExcelImportModal;

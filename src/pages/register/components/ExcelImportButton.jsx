import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import * as XLSX from 'xlsx/xlsx.mjs';

/**
 * 这是一个用于导入excel文件的button，点击button选择文件，解析文件后会将数据传入展示Modal中，Modal的内容由自己自定义。
 * children button上显示的内容，例如icon+文字
 * KeyMap excel表格中的中文title和系统中英文名称的对应关系
 * reload 刷新proTable的函数
 * saveService 上传excel文件数据的接口
 * ExcelImportModal 导入excel结果的展示弹窗
 * */
const ExcelImportButton = ({ children, KeyMap, reload, saveService, ExcelImportModal }) => {
  const [excelData, setExcelData] = useState([]);
  const [excelImportModalVisible, setExcelImportModalVisible] = useState(false); // excel导入结果展示弹窗
  const [importLoading, setImportLoading] = useState(false);

  // 旧key到新key的映射
  const keyMap = (array) =>
    array.map((item) =>
      Object.keys(KeyMap).reduce((newData, key) => {
        newData[KeyMap[key]] = item[key] || '';
        return newData;
      }, {}),
    );

  const beforeUpload = (file) => {
    // 限制上传文件的后缀为".xls"或".xlsx"
    const fileName = file.name;
    const fileSuffix = fileName.substring(fileName.lastIndexOf('.'));
    if (!['.xls', '.xlsx'].includes(fileSuffix)) {
      message.error('请上传".xls"或".xlsx"后缀的Excel文件');
      return;
    }
    // 获取上传的文件对象
    const fileReader = new FileReader(); // 通过FileReader对象读取文件
    fileReader.onload = (event) => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' }); // 以二进制流方式读取得到整份excel表格对象
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]); // 获取第一张表的数据
        // 判断表是否为空
        if (data.length === 0) {
          message.error('Excel文件内容为空！');
          setImportLoading(false);
          return;
        }
        const mapData = keyMap(data);
        setExcelData(mapData); // 存储获取的表数据
        setExcelImportModalVisible(true);
      } catch (e) {
        message.error('文件导入发生错误！');
      }
      setImportLoading(false);
    };
    setImportLoading(true);
    setTimeout(() => {
      fileReader.readAsBinaryString(file); // 以二进制方式打开文件
    }, 250); // 为了防止button的loading动画被阻塞，增加250毫秒的时间给button播放loading展开动画。
  };

  return (
    <>
      <Upload beforeUpload={beforeUpload} accept=".xls,.xlsx" showUploadList={false} maxCount={1}>
        <Button type="primary" loading={importLoading}>
          {children}
        </Button>
      </Upload>
      {excelImportModalVisible && (
        <ExcelImportModal
          visible={excelImportModalVisible}
          onCancel={() => setExcelImportModalVisible(false)}
          excelData={excelData}
          KeyMap={KeyMap}
          setExcelData={setExcelData}
          reload={reload}
          saveService={saveService}
        />
      )}
    </>
  );
};

export default ExcelImportButton;

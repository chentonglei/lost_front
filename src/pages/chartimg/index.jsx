import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Line } from '@ant-design/charts';
import { Card, Button, Radio } from 'antd';
import ip from '../../ip';
import * as echarts from 'echarts';
import styles from './index.less';
import * as services from './service';
var arr1 = new Array(24);
for (var i = 0; i < arr1.length; i++) {
  arr1[i] = i;
}
const DemoLine = () => {
  const [value, setValue] = useState('今天');
  const [point, setPoint] = useState([]);
  const [num, setNum] = useState([]);
  useEffect(() => {
    const body = { value };
    const fetchData = async () => {
      const result = await request(`${ip}/chart/lost`, {
        method: 'POST',
        data: body,
      });
      setPoint(result.point);
      setNum(result.num);
    };
    fetchData();
  }, [value]);
  useEffect(() => {
    tu();
  }, [point, num]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const tu = () => {
    var myChart = echarts.init(document.getElementById('main'));
    console.log(point);
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: point,
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          name: 'num',
          label: {
            show: true,
          },
          data: num,
          type: 'line',
        },
      ],
    });
  };
  /*  const data = [
    {
      year: '1',
      num: 3,
    },
    {
      year: '5',
      num: 4,
    },
    {
      year: '10',
      num: 3.5,
    },
    {
      year: '11',
      num: 5,
    },
    {
      year: '15',
      num: 4.9,
    },
    {
      year: '16',
      num: 6,
    },
    {
      year: '18',
      num: 7,
    },
    {
      year: '19',
      num: 9,
    },
    {
      year: '23',
      num: 13,
    },
  ]; */
  return (
    <Card
      title="失物信息"
      extra={
        <>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value="今天">今天</Radio>
            <Radio value="近30天">近30天</Radio>
            <Radio value="近一年">近一年</Radio>
          </Radio.Group>
        </>
      }
    >
      <div
        id="main"
        style={{
          height: 400,
        }}
      />
    </Card>
  );
};

export default DemoLine;

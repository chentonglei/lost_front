import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Line } from '@ant-design/charts';
import { Card, Button, Radio } from 'antd';
import ip from '../../ip';
import * as echarts from 'echarts';
const Recruit = () => {
  const [value, setValue] = useState('今天');
  const [point, setPoint] = useState([]);
  const [num, setNum] = useState([]);
  useEffect(() => {
    const body = { value };
    const fetchData = async () => {
      const result = await request(`${ip}/chart/recruit`, {
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

export default Recruit;

import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Line } from '@ant-design/charts';
import { Card, Button, Radio } from 'antd';
import ip from '../../ip';
import * as echarts from 'echarts';
import styles from './index.less';
import * as services from './service';
const DemoLine = () => {
  const [value, setValue] = useState('近一年');
  const [point, setPoint] = useState([]);
  const [num, setNum] = useState([]);
  const [num2, setNum2] = useState([]);
  const [num3, setNum3] = useState([]);
  const [num4, setNum4] = useState([]);
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
    const fetchData2 = async () => {
      const result = await request(`${ip}/chart/recruit`, {
        method: 'POST',
        data: body,
      });
      setNum2(result.num);
    };
    const fetchData3 = async () => {
      const result = await request(`${ip}/chart/comment`, {
        method: 'POST',
        data: body,
      });
      setNum3(result.num);
    };
    const fetchData4 = async () => {
      const result = await request(`${ip}/chart/return`, {
        method: 'POST',
        data: body,
      });
      setNum4(result.num);
    };
    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
  }, [value]);
  useEffect(() => {
    tu();
  }, [point, num2, num3, num, num4]);
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
      legend: {
        data: ['失物', '招领', '评论', '归还'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: point,
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [
        {
          name: '失物',
          type: 'line',
          data: num,
        },
        {
          name: '招领',
          type: 'line',
          data: num2,
        },
        {
          name: '评论',
          type: 'line',
          data: num3,
        },
        {
          name: '归还',
          type: 'line',
          data: num4,
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
      title="失物招领情况"
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

import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Line } from '@ant-design/charts';
import { Card, Button, Radio, Row, Col } from 'antd';
import ip from '../../ip';
import * as echarts from 'echarts';
const Comment = () => {
  const [value, setValue] = useState('今天');
  const [i, setI] = useState(0);
  const [k, setK] = useState(0);
  const [body, setBody] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await request(`${ip}/chart/user`, {
        method: 'POST',
      });
      setI(result.boy);
      setK(result.girl);
    };
    const fetchData2 = async () => {
      const result = await request(`${ip}/chart/school`, {
        method: 'POST',
      });
      setBody(result);
    };
    fetchData();
    fetchData2();
  }, []);
  useEffect(() => {
    tu();
    tu2();
  }, [i, k, body]);
  const tu = () => {
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '性别比例',
          type: 'pie',
          radius: '50%',
          data: [
            { value: i, name: '男性' },
            { value: k, name: '女性' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  };
  const tu2 = () => {
    var myChart = echarts.init(document.getElementById('main2'));
    myChart.setOption({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '认证比例',
          type: 'pie',
          radius: '50%',
          data: body,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card title="用户性别分布">
          <div
            id="main"
            style={{
              height: 400,
            }}
          />
        </Card>
      </Col>
      <Col span={16}>
        <Card title="用户认证分布">
          <div
            id="main2"
            style={{
              height: 400,
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Comment;

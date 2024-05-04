import { Column } from '@ant-design/plots';
import React from 'react';


const data = [
  { type: 'Jan', value: 0.16 },
  { type: 'Feb', value: 0.125 },
  { type: 'Mar', value: 0.24 },
  { type: 'Apr', value: 0.19 },
  { type: 'May', value: 0.22 },
  { type: 'Jun', value: 0.05 },
  { type: 'Jul', value: 0.01 },
  { type: 'AUug', value: 0.015 },
];

export const RevenueChart = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ type, value }) => {
        if (value === 0.10 || value < 0.10) {
          return 'red';
        }
        return 'yellow';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return <Column {...config} />;
};


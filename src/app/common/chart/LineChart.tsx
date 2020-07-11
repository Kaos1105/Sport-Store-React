import React from 'react';
import { Line } from 'react-chartjs-2';

interface IProps {
  labels: string[];
  label: string;
  p_label: string;
  data: number[];
  p_data: number[];
  text: string;
}

const LineChart: React.FC<IProps> = ({ labels, label, p_label, p_data, data, text }) => {
  //   const colors = (data: number[]) => {
  //     let result: string[] = [];
  //     data.map((value, index) => {
  //       if (index % 2 == 0) {
  //         result.push('blue');
  //       } else {
  //         result.push('teal');
  //       }
  //     });
  //     return result;
  //   };
  const state = {
    labels: labels,
    datasets: [
      {
        lineTension: 0.2,
        fill: false,
        label: label,
        backgroundColor: 'orange',
        borderColor: 'blue',
        borderWidth: 2,
        data: data,
      },
      {
        lineTension: 0.2,
        fill: false,
        label: p_label,
        backgroundColor: 'red',
        borderColor: 'green',
        borderWidth: 2,
        data: p_data,
      },
    ],
  };
  return (
    <Line
      data={state}
      options={{
        title: {
          display: true,
          text: text,
          fontSize: 20,
        },
        legend: {
          display: true,
          position: 'right',
        },
      }}
    />
  );
};

export default LineChart;

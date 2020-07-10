import React from 'react';
import { Bar } from 'react-chartjs-2';

interface IProps {
  labels: string[];
  label: string;
  data: number[];
  text: string;
  color: string;
}

const BarChart: React.FC<IProps> = ({ label, labels, data, text, color }) => {
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
        label: label,
        backgroundColor: color,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data,
      },
    ],
  };
  return (
    <Bar
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

export default BarChart;

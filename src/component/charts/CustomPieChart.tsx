import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

type data={
    name: string;
    value: number;
  heading:string
}

const data = [
  { name: 'Occupied', value: 30 },  // Replace with your occupied count
  { name: 'Unoccupied', value: 70 }, // Replace with your unoccupied count
];

const COLORS = ['#FF8042', '#0088FE'];

const CustomPieChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200} // Center X
        cy={200} // Center Y
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;

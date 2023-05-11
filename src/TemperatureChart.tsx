import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type TemperatureData = {
  temperature: number;
  time: number;
};

type Props = {
  data: TemperatureData[];
};

const TemperatureChart: React.FC<Props> = ({ data }) => {
     const formatTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
    <ResponsiveContainer width={1400} height={500}>
    <LineChart  data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={['dataMin', 'dataMax']} interval="preserveStartEnd" tickCount={10} tickFormatter={formatTime} dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

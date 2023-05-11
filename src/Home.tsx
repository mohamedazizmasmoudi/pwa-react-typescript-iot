import React, {useEffect, useState} from 'react';
import { io } from "socket.io-client";
import TemperatureChart from './TemperatureChart';
let socket:any = null;

type TemperatureData = {
  temperature: number;
  time: number;
};

type Props = {
  data: TemperatureData[];
};
const Home: React.FC = () => {
  // const temperatureData = [20, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const [temperatureData, setTemperatureData]=useState<TemperatureData[]>([

  ])

  useEffect(()=>{
    const arr = []
    if(!socket){
      socket = io("http://localhost:5002");
      socket.emit('join', 'iotProject', (error:any) => {
        if (error) {
          alert(error);
        }
      });
      socket.on('temperature', async (temperature:number) => {
        if(arr.length>10)
        setTemperatureData(temperatureData => [...temperatureData.slice(1), {temperature:temperature,time: arr.length}]);
        else        setTemperatureData(temperatureData => [...temperatureData, {temperature:temperature,time: arr.length}]);

        arr.push(temperature)
      });
    }
  },[])
  return (
    <div>
      <h1>Real-time Temperature Chart</h1>
      <TemperatureChart data={temperatureData} />
    </div>
  );
};

export default Home;
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HUD(){
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const ref = useRef<number>(0);

  useEffect(()=>{
    const id = setInterval(()=>{
      ref.current += Math.floor(Math.random()*5 + 1);
      setDataPoints(prev => [...prev.slice(-19), ref.current]);
    }, 400);
    return ()=>clearInterval(id);
  },[]);

  const data = {
    labels: dataPoints.map((_,i)=>i+1),
    datasets: [
      {
        label: 'Score over time',
        data: dataPoints,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      }
    ]
  };

  return (
    <div>
      <h3>HUD & Analytics</h3>
      <div style={{height:240}}>
        <Line data={data} />
      </div>
      <div style={{marginTop:12}}>
        <div style={{fontWeight:700}}>Coins: <span style={{color:'#ffcc00'}}>420</span></div>
        <div style={{color:'#9aa6c3',marginTop:6}}>Missions: 3 active</div>
      </div>
    </div>
  );
}

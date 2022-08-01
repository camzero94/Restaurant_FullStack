import {Line} from  'react-chartjs-2'
import Data from '../../namespaces/Data'
import {Chart as  ChartJS , Title, Tooltip, LineElement, Legend, CategoryScale,  LinearScale, PointElement} from 'chart.js'
import React, {useState} from 'react'

ChartJS.register(Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement);


const LineChartComponent: React.FC<Data.IData> = () =>{
    const [data,setData] = useState({
      labels:["Jan","Feb","March"],
      datasets :[

      {
        label:"First Data Sample",
        data:[10,20,30],
        backgroundColor: 'yellow',
        }]

      }); 

    return (
    <Line data={data}> Hello</Line>
    );
  }

export default LineChartComponent;

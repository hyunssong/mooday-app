import React from 'react';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.5, // disables bezier curves
    },
  },
  events:[],
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        callback: function (label) {
          if (label == 3) {
            return "GOOD";
          } else if (label == 2) {
            return "NEUTRAL";
          } else if (label == 1) {
            return "NEGATIVE";
          }
        },
      },
    },
  },
};


function MoodChart(props) {
    const [posts, setPosts] = useState(props.posts);
    const [mood, setMood] = useState([]);
    const [labels, setLabels] = useState([]);
    useEffect(()=>{
        setLabels(Array.from(Array(posts.length).keys()));
        //convert sentiment to numerical data
        const moods = []
        posts.forEach( (post)=>{
            let sentiment = post.sentiment ;
            let sentIdx = 0;
            switch(sentiment){
                case "positive": sentIdx=3;break;
                case "neutral": sentIdx=2;break;
                case "negative": sentIdx=1;break;
                default: sentIdx=0; break;
            }
            moods.push(sentIdx);
        } )
        setMood(moods);
    },[])
   const data = {
     labels,
     datasets: [
       {
         label: "MOOD",
         data: mood,
       },
     ],

   };
   //TODO: fix labels and axes of the chart
    return <div>{posts.length>0 && <Line options={options} data={data} />}</div>;
}

export default MoodChart;
import './style.css';
// import {Chart, registerables} from 'chart.js';
// Chart.register(...registerables);
const lineGraph = document.querySelector(".line-graph");

// options
const lineGraphOptions = {
  aspectRatio: 2.5,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: false,
          passing: 12
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          padding: 12,
        },
        gridLines: {
          display: false
        },
      },
    ] ,
  },
  legend: {
    display: false
  },
};

const myChart = new Chart(lineGraph, {
  type: "line",
  data: {
    labels: ["Jan 31", "Feb 7", "Feb 14", "Feb 21", "Feb 28"],
    datasets: [
      {
        data: [1, 7, 2, 3, 2],
        borderColor: "rgba(255,117,92,1)",
        pointBorderColor: "rgba(255,255,255,1)",
        pointBackgroundColor: "rgba(255,255,255,1)",
        borderWidth: 3,
        fill: false,
      },
    ],
  },
  options: lineGraphOptions,
})

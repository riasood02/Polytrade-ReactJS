import React from "react";

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
import { Line } from "react-chartjs-2";
import { xVal, yVal } from "../Utils/ApiFetch";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
/**
 * Create Line Chart with the data fetched from API
 */
const LineChart = () => {
  const LineData1 = {
    data: {
      labels: xVal,
      datasets: [
        {
          data: yVal,
          backgroundColor: "white",
          borderColor: "grey",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={LineData1.data} options={LineData1.options}></Line>
    </div>
  );
};

export default LineChart;

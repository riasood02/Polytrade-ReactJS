import React, { useEffect, useState } from "react";

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
import { APIFetchData } from "../Utils/FetchAPI";
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
  const [LineData, setLineData] = useState<{ [key: string]: any }>({
    data: {
      labels: [],
      datasets: [
        {
          data: [],
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
  });
  useEffect(() => {
    let chartValues = new Map();
    let xVal: string[] = [];
    let yVal: Number[] = [];
    var totalInv = 0;
    APIFetchData.then((res) => {
      var apiData = res.data;
      const sortbyDate = (a: any, b: any) => {
        return (
          new Date(a.disbursedDate).valueOf() -
          new Date(b.disbursedDate).valueOf()
        );
      };
      const len: Number = apiData.length;
      for (var i = 0; i < len; i++) {
        const d = new Date(apiData[i].disbursedDate);
        const dt =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        apiData[i].disbursedDate = dt;
        const invoice_amount = parseFloat(apiData[i].invoiceAmount);
        totalInv += invoice_amount;
        if (chartValues.has(apiData[i].disbursedDate) === true) {
          const initialInvoice = chartValues.get(apiData[i].disbursedDate);
          chartValues.set(
            apiData[i].disbursedDate,
            initialInvoice + invoice_amount
          );
        } else {
          chartValues.set(apiData[i].disbursedDate, invoice_amount);
        }
      }
      apiData.sort(sortbyDate);

      chartValues.forEach((values, keys) => {
        xVal.push(keys);
        yVal.push(values);
      });
      setLineData({
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
      });
    });
  }, []);
  return (
    <div>
      <Line data={LineData.data} options={LineData.options}></Line>
    </div>
  );
};

export default LineChart;

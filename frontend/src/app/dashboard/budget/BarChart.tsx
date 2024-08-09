import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

interface BarChartProps {
  categories: string[];
  amounts: number[];
}

const BarChart: React.FC<BarChartProps> = ({ categories, amounts }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Budget Amount",
              data: amounts,
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Budget data - bar chart",
              padding: {
                top: 10,
                bottom: 30,
              },
            },
          },
          animation: {
            duration: 6000,
            easing: "easeOutElastic",
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [categories, amounts]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
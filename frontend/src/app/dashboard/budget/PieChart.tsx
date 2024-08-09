import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

interface PieChartProps {
  categories: string[];
  amounts: number[];
}

const PieChart: React.FC<PieChartProps> = ({ categories, amounts }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);

      const chartInstance = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Budget Amount",
              data: amounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Budget data - pie chart",
              padding: {
                top: 10,
                bottom: 30,
              },
            },
            datalabels: {
              color: "white",
              formatter: (value, context) => {
                const percentage = ((value / totalAmount) * 100).toFixed(2);
                return `${percentage}%`;
              },
            },
          },
          animation: {
            duration: 9000,
            easing: "easeOutBounce",
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [categories, amounts]);

  return (
    <div style={{ marginTop: "15px", width: "700px", height: "700px" }}>
      <canvas
        ref={chartRef}
        width="700"
        height="700"
        aria-label="Hello ARIA World"
        role="img"
      />
    </div>
  );
};

export default PieChart;

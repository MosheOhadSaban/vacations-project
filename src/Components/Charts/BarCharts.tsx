import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { AppState } from "../../Redux/app-state";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarCharts() {
  const vacationsChartsData = useSelector(
    (state: AppState) => state.vacationsChartsData
  );
  let vacationsTitleArray = [];
  let vacationsFollowersAmount = [];
  for (let index = 0; index < vacationsChartsData.length; index++) {
    vacationsTitleArray.push(vacationsChartsData[index].title);
    vacationsFollowersAmount.push(vacationsChartsData[index].amount);
  }
  const labels = vacationsTitleArray;
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Followers Chart",
        fontSize: 25,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Followed-Vacations",
        data: vacationsFollowersAmount,
        backgroundColor: "rgba(11, 127, 171, 0.5)",
      },
    ],
  };

  return (
    <Bar options={options} data={data} width={"1000px"} height={"300px"} />
  );
}

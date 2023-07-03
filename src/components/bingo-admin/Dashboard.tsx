import React, { useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import API from "../../config/api";
import { getAuthUser } from "../../util/localstorage";
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
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Earning Report",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Dashboard() {
  const [todayProfit, setTodayProfit] = useState(0);
  const [thisMonthProfit, setThisMonthProfit] = useState(0);
  const [thisYearProfit, setThisYearProfit] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [twelveMonthReport, setTwelveMonthReport] = useState<any[]>([]);

  useEffect(() => {
    const { accessToken, agentId } = getAuthUser();
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // today
    API.get(`/plays/admin-profit/today`)
      .then((result) => {
        setTodayProfit(result.data);
      })
      .catch((err) => console.log("Error: ", err));

    // this month
    API.get(`/plays/admin-profit/this-month`)
      .then((result) => {
        setThisMonthProfit(result.data);
      })
      .catch((err) => console.log("Error: ", err));

    // this year
    API.get(`/plays/admin-profit/this-year`)
      .then((result) => {
        setThisYearProfit(result.data);
      })
      .catch((err) => console.log("Error: ", err));

    // twelve month report
    API.get(`/plays/admin-profit/twelve-month-report`)
      .then((result) => {
        setTwelveMonthReport(result.data);
      })
      .catch((err) => console.log("Error: ", err));

    // total
    API.get(`/plays/admin-profit/total`)
      .then((result) => {
        setTotalProfit(result.data);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Profit",
        data: labels.map(
          (_, index) => twelveMonthReport[index]?.profit as number
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        {/* today */}
        <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 bg-green-500 p-4 text-white">
          <div className="flex flex-row justify-between">
            <div className="w-fit rounded-full bg-green-50 p-4">
              <GiCash className="text-2xl font-bold text-green-500" />
            </div>

            <div className="text-2xl font-bold">{todayProfit} $</div>
          </div>

          <h2 className="uppercase">Today</h2>
        </div>

        {/* this month */}
        <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 bg-yellow-500 p-4 text-white">
          <div className="flex flex-row justify-between">
            <div className="w-fit rounded-full bg-yellow-50 p-4">
              <GiCash className="text-2xl font-bold text-yellow-500" />
            </div>

            <div className="text-2xl font-bold">{thisMonthProfit} $</div>
          </div>

          <h2 className="uppercase">This Month</h2>
        </div>

        {/* this year */}
        <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 bg-indigo-500 p-4 text-white">
          <div className="flex flex-row justify-between">
            <div className="w-fit rounded-full bg-indigo-50 p-4">
              <GiCash className="text-2xl font-bold text-indigo-500" />
            </div>

            <div className="text-2xl font-bold">{thisYearProfit} $</div>
          </div>

          <h2 className="uppercase">This Year</h2>
        </div>

        {/* all time total */}
        <div className="flex w-full flex-col gap-2 rounded-md border border-gray-200 bg-orange-500 p-4 text-white">
          <div className="flex flex-row justify-between">
            <div className="w-fit rounded-full bg-orange-50 p-4">
              <GiCash className="text-2xl font-bold text-orange-500" />
            </div>

            <div className="text-2xl font-bold">{totalProfit} $</div>
          </div>

          <h2 className="uppercase">Total</h2>
        </div>
      </div>

      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Chart() {
  const [sessions, setSessions] = useState([]);
  const [monthChartData, setMonthChartData] = useState([]);
  const [weekChartData, setWeekChartData] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/home`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data.user.sessions || []);
    } catch (error) {
      console.error("Something wrong happened!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const months = Array(12).fill(0);
    const days = Array(7).fill(0);

    sessions.forEach((session) => {
      const month = dayjs(session.date).month();
      months[month]++;

      const day = dayjs(session.date).day();
      days[day]++;
    });

    const monthData = months.map((number, i) => ({
      name: dayjs().month(i).format("MMM"),
      nOfSessions: number,
    }));

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekData = days.map((number, i) => ({
      name: dayNames[i],
      nOfSessions: number,
    }));

    setMonthChartData(monthData);
    setWeekChartData(weekData);
  }, [sessions]);

  return (
    <>
      <h2 className="numofse">Nomber Of Sessions: {sessions.length}</h2>
      {/* <h2>{sessions}</h2> */}
      <br />

      <h2>Sessions per Day</h2>
      <div height="600px" width="600px">
        <BarChart width={700} height={400} data={weekChartData}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nOfSessions" fill="#c0b3dfff" />
        </BarChart>
      </div>
      <h2 className="lables">Sessions per Month</h2>
      <div height="600px" width="600px">
        <BarChart width={700} height={400} data={monthChartData}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nOfSessions" fill="#c0b3dfff" />
        </BarChart>
      </div>
    </>
  );
}

export default Chart;

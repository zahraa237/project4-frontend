import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./homepage.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showDay, setShowDay] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/home`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      setSessions(res.data.user.sessions || []);
    } catch (error) {
      console.error("Something wrong happened!", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredSessions = sessions.filter((session) => {
    const sessionDate = dayjs(session.date);
    const today = dayjs();

    if (showDay) {
      return sessionDate.isSame(today, "day");
    } else if (showWeek) {
      return sessionDate.isSame(today, "week");
    } else if (showMonth) {
      return sessionDate.isSame(today, "month");
    } else if (showYear) {
      return sessionDate.isSame(today, "year");
    }

    return true;
  });

  return (
    <div className="home-page">
      <div className="profile-buttons">
        <button onClick={() => setShowDay(!showDay)}>Day</button>
        <button onClick={() => setShowWeek(!showWeek)}>Week</button>
        <button onClick={() => setShowMonth(!showMonth)}>Month</button>
        <button onClick={() => setShowYear(!showYear)}>Year</button>
      </div>

      <h2>Your Sessions</h2>
      <div className="sessions-container">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div className="one-session">
              <div className="session-header">
                <img
                  src={session.tree.type}
                  alt="tree"
                  className="session-icon"
                />
                <div class="session-name">{session.title}</div>
              </div>
              <div className="session-details">
                {session.time} mins - {session.tree?.type} -{" "}
                {session.completed ? "yes" : "no"} - {session.date}
              </div>
            </div>
          ))
        ) : (
          <p>No sessions yet. Start one!</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

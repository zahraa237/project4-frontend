import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="home-page">
      <div className="profile-buttons">
        <button onClick={() => setShowDay(!showDay)}>Day</button>
        <button onClick={() => setShowWeek(!showWeek)}>Week</button>
        <button onClick={() => setShowMonth(!showMonth)}>Month</button>
        <button onClick={() => setShowYear(!showYear)}>Year</button>
      </div>
      {/* <button onClick={() => setShowForm(true)}>Create session</button> */}

      <h2>Your Sessions</h2>
      <ul>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <li key={session._id}>
              <strong>{session.title}</strong> - {session.time} mins -{" "}
              {session.tree.type} - {session.completed ? "yes" : "no"}
            </li>
          ))
        ) : (
          <p>No sessions yet. Start one!</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;

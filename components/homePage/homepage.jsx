import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [treeType, setTreeType] = useState("");

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

  const createSession = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/session/new`,
        { title, time, treeType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowForm(false);
      setTitle("");
      setTime("");
      setTreeType("");
      fetchData();
    } catch (error) {
      console.error("Failed to create new session :(", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome , {user?.username} </h1>

      <button onClick={() => setShowForm(true)}>Create session</button>

      {showForm && (
        <div className="modal">
          <div className="model-contents">
            <h1>Create session</h1>

            <form onSubmit={createSession}>
              {/* TITLE */}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {/* TIME */}
              <input
                type="number"
                placeholder="Time(minutes)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />

              {/* TREE TYPE */}
              <input
                type="text"
                placeholder="Tree Type"
                value={treeType}
                onChange={(e) => setTreeType(e.target.value)}
              />
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

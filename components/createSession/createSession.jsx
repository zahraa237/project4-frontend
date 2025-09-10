import { useState } from "react";
import axios from "axios";
import "./createSession.css";

function CreateSession() {
  //   const [user, setUser] = useState(null);
  //   const [sessions, setSessions] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [treeType, setTreeType] = useState("");

  const token = localStorage.getItem("token");

  const createSession = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating session:", { title, time, treeType });

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/session/new`,
        { title, time, treeType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // setShowForm(false);
      setTitle("");
      setTime("");
      setTreeType("");
      // fetchData();
    } catch (error) {
      console.error("Failed to create new session :(", error);
    }
  };
  return (
    <>
      <div className="modal">
        <div className="model-contents">
          <h1>Create session</h1>

          <form onSubmit={createSession}>
            {/* TITLE */}
            <input
              type="text"
              placeholder="Title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              //required
            />

            {/* TIME */}
            <input
              type="number"
              placeholder="Time(minutes)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              //required
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateSession;

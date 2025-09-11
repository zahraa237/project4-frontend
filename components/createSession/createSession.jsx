import { useState } from "react";
import axios from "axios";
import "./createSession.css";

import Timer from "../timer/timer";

function CreateSession() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [treeType, setTreeType] = useState("/trees/1.jpg");
  const [showTrees, setShowTrees] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const token = localStorage.getItem("token");

  const allTrees = [
    "/trees/1.jpg",
    "/trees/2.jpg",
    "/trees/3.jpg",
    "/trees/4.jpg",
    "/trees/5.jpg",
    "/trees/6.jpg",
    "/trees/7.jpg",
  ];

  const createSession = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/session/new`,
        { title, time, treeType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setSessionId(res.data.session._id);
      setTitle("");
      setTime("");
    } catch (error) {
      console.error("Failed to create new session :(", error);
    }
  };

  return (
    <>
      <div className="modal">
        <div className="model-contents">
          <h1>start planting</h1>

          <form onSubmit={createSession}>
            {/* TREE TYPE */}
            <div className="tree-picker">
              <img
                src={treeType}
                alt="selected tree"
                className="tree-image"
                onClick={() => setShowTrees(true)}
              />
            </div>

            {/* choosing a tress */}
            {showTrees ? (
              <div className="all-trees">
                <h3>Choose a plant</h3>

                <div className="tree-options">
                  {allTrees.map((img) => (
                    <div
                      key={img}
                      className="tree-option"
                      onClick={() => {
                        setTreeType(img);
                        setShowTrees(false);
                      }}
                    >
                      <img src={img} alt="Tree" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {/* TITLE */}
            <input
              type="text"
              placeholder="session name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            {/* TIME */}
            <input
              type="number"
              placeholder="Time in minutes"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            />

            <button type="submit">Save</button>
          </form>

          {sessionId ? <Timer sessionId={sessionId} /> : null}
        </div>
      </div>
    </>
  );
}
export default CreateSession;

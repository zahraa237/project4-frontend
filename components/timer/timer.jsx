import { useEffect, useState } from "react";
import axios from "axios";

function Timer({ sessionId }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const [session, setSession] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const token = localStorage.getItem("token");

  const getSession = async () => {
    if (!sessionId) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/session/${sessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setSession(res.data.session);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    setIsCancelled(false);
    setRemainingTime(null);
  }, [sessionId]);

  useEffect(() => {
    if (!session || !session.endTime) return;

    const endTime = new Date(session.endTime);

    const interval = setInterval(() => {
      const now = new Date();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setRemainingTime("Session ended");
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime(`${minutes}m ${seconds.toString().padStart(2, "0")}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  const handleCancel = async () => {
    setIsCancelled(true);
    setRemainingTime("Session cancelled");
  };

  if (isCancelled) {
    return <div>Session cancelled</div>;
  }

  return (
    <div>
      <h2>
        Remaining Time:{" "}
        {remainingTime !== null
          ? remainingTime
          : session?.time
          ? `${session.time}m 00s`
          : "Loading..."}
      </h2>
      <button onClick={handleCancel}>cancell session</button>
    </div>
  );
}

export default Timer;

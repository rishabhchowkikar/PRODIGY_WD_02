import React, { useState, useEffect } from "react";

import "./StopWatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [
      ...prevLaps,
      {
        lapNumber: prevLaps.length + 1,
        lapTime: time,
      },
    ]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  };

  const pad = (num) => {
    return ("0" + num).slice(-2);
  };

  return (
    <div className="stopwatch-container">
      <h1>StopWatch</h1>
      <div className="container">
        <div className="display">{formatTime(time)}</div>
        <div className="buttons">
          {!isRunning && !isPaused && (
            <button
              onClick={handleStart}
              class="button-82-pushable"
              role="button"
            >
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">Start</span>
            </button>
          )}
          {isRunning && (
            <button
              onClick={handlePause}
              class="button-82-pushable"
              role="button"
            >
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">Pause</span>
            </button>
          )}

          {isPaused && (
            <button
              onClick={handleResume}
              class="button-82-pushable"
              role="button"
            >
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">Resume</span>
            </button>
          )}

          <button onClick={handleLap} class="button-82-pushable" role="button">
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">Lap</span>
          </button>

          <button
            onClick={handleReset}
            class="button-82-pushable"
            role="button"
          >
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">Reset</span>
          </button>
        </div>

        <table className="laps-table">
          <thead>
            <tr>
              <th>Lap</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => (
              <tr key={lap.lapNumber}>
                <td>Lap {lap.lapNumber}</td>
                <td>{formatTime(lap.lapTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stopwatch;

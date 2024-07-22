import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Nav from "./Nav";

function Home() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fitness-backend-eu1w.onrender.com/api/workout-plans")
      .then((response) => {
        console.log("Response data:", response.data);
        setWorkoutPlans(response.data.workoutPlans); 
      })
      .catch((error) => {
        console.error("Error fetching workout plans:", error);
      });
  }, []);

  const handleStartWorkout = (id) => {
    navigate(`/workout/${id}`);
  };

  return (
    <div className="home">
      <Nav />
      <div className="workout-plans">
        {workoutPlans.map((workout) => (
          <div className="workout-plan" key={workout.id} onClick={() => handleStartWorkout(workout.id)}>
            <h2>{workout.name}</h2>
            <p>{workout.description}</p>
            <p>Duration: {workout.duration} mins</p>
            <img src={workout.imageUrl} alt={workout.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

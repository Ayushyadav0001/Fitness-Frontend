import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import Nav from './Nav';

function WorkoutPage() {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedWorkouts, setSelectedWorkouts] = useState({});

  useEffect(() => {
    if (!id) {
      console.error('Invalid workout plan ID:', id);
      return;
    }

    axios.get(`https://fitness-backend-eu1w.onrender.com/api/workout-plans`)
      .then(response => {
        const plan = response.data.workoutPlans.find(plan => plan.id === parseInt(id));

        if (plan) {
          setWorkoutPlan(plan);
          // Initialize selected workouts state
          const initialSelectedWorkouts = {};
          if (plan.workouts && Array.isArray(plan.workouts)) {
            plan.workouts.forEach(workout => {
              initialSelectedWorkouts[workout.name] = false;
            });
          }
          setSelectedWorkouts(initialSelectedWorkouts);
        } else {
          console.error('Workout plan not found:', id);
        }
      })
      .catch(error => {
        console.error('Error fetching workout plans:', error);
      });
  }, [id]);

  const handleCheckboxChange = (workoutName) => {
    setSelectedWorkouts({
      ...selectedWorkouts,
      [workoutName]: !selectedWorkouts[workoutName]
    });
  };

  if (workoutPlan === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-plan">
      <Nav />
      <h1 className="workout-plan-title">{workoutPlan.name}</h1>
      <img src={workoutPlan.imageUrl} alt={workoutPlan.name} className="workout-image" />
      <p>{workoutPlan.description}</p>
      <div className="workout-list">
        {workoutPlan.workouts && workoutPlan.workouts.length > 0 ? (
          workoutPlan.workouts.map(workout => (
            <div key={workout.name} className={`workout-item ${selectedWorkouts[workout.name] ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={selectedWorkouts[workout.name]}
                onChange={() => handleCheckboxChange(workout.name)}
              />
              <label>{workout.name}</label>
            </div>
          ))
        ) : (
          <p>No workouts available.</p>
        )}
      </div>
      {Object.values(selectedWorkouts).every(value => value) && (
        <div className="workout-completed">
          Workout Completed!
        </div>
      )}
    </div>
  );
}

export default WorkoutPage;
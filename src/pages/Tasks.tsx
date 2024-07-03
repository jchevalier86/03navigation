import React from "react";
import Logo from "../images/taches.png";
import TaskForm from "../components/TaskFormObject";
import { fetchTasks } from "../services/fetchTasks";
import ITasks from "../interfaces/ITasks";

const Tasks: React.FC = () => {
  let tasks = fetchTasks;
  console.log(tasks);

  return (
    <div className="container mx-auto mt-4">
      <img src={Logo} alt="Logo Tâches" width="200" height="500"></img>
      <br />
      <TaskForm />
      <p className="mt-3">Liste des tâches</p>
    </div>
  );
};

export default Tasks;

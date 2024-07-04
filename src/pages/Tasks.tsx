import React, { useState, useEffect } from "react";
import Logo from "../images/taches.png";
import TaskForm from "../components/TaskFormObject";
import TaskRow from "../components/TaskRow";
import { fetchTasks, addTask, deleteTask } from "../services/fetchTasks";
import ITasks from "../interfaces/ITasks";

const Tasks: React.FC = () => {
  const [listTasks, setListTasks] = useState<ITasks[]>([]);
  let tasks = fetchTasks;
  console.log(tasks);

  const addTaskInComponentTasks = async (taskToAdd: ITasks) => {
    let tasks = await addTask(taskToAdd);
    console.log(tasks);
    // afficher la liste
    await getAllTasks();
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const deleteTaskInComponentTasks = async (id: string) => {
    //ajouter une tâche
    let tasks = await deleteTask(id);
    console.log(tasks);
    //afficher la liste
    await getAllTasks();
  };

  //pour récupérer la liste
  const getAllTasks = async () => {
    let list = await fetchTasks();
    setListTasks(list);
  };

  // function addTaskInComponentTasks(taskToAdd: ITasks) {
  //   console.log(taskToAdd);
  // }

  return (
    <div className="container mx-auto mt-4">
      <img src={Logo} alt="Logo Tâches" width="200" height="500"></img>
      <br />
      <div></div>
      <div>
        <TaskForm
          addTaskInComponentTasks={(taskToAdd: ITasks) =>
            addTaskInComponentTasks(taskToAdd)
          }
        />

        <div>
          {listTasks.map((task: ITasks) => {
            return (
              <div key={task._id}>
                {task.title} {task._id}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3">Liste des tâches</p>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>DONE</th>
              <th>TITRE</th>
              <th>DESCRIPTION</th>
              <th>DATE</th>
              <th>MODIFIER</th>
              <th>SUPPRIMER</th>
            </tr>
          </thead>
          {listTasks.map((taskRow: ITasks) => {
            return (
              <TaskRow
                taskRow={taskRow}
                key={taskRow._id}
                deleteTaskInComponentTasks={(id: string) =>
                  deleteTaskInComponentTasks(id)
                }
              />
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Tasks;

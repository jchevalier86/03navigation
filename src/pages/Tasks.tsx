import React, { useState, useEffect } from "react";
import Logo from "../images/taches.png";
import TaskForm from "../components/TaskFormObject";
import TaskRow from "../components/TaskRow";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTaskDone,
} from "../services/fetchTasks";
import ITasks from "../interfaces/ITasks";

const Tasks: React.FC = () => {
  const [listTasks, setListTasks] = useState<ITasks[]>([]);
  let tasks = fetchTasks;
  console.log(tasks);
  const [modalDeleteStyle, setModalDeleteStyle] = useState("modalDeleteHidden");
  const [idTaskToDelete, setIdTaskToDelete] = useState("");

  /* --- */
  /* Add */
  /* --- */

  const addTaskInComponentTasks = async (taskToAdd: ITasks) => {
    let tasks = await addTask(taskToAdd);
    console.log(tasks);
    // afficher la liste
    await getAllTasks();
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  /* ----- */
  /* Modal */
  /* ----- */

  // montre le modal de suppresion
  const deleteTaskInComponentTasks = (idRowTask: string) => {
    //ouvrir modal de validation
    setModalDeleteStyle("modalDeleteVisible");
    setIdTaskToDelete(idRowTask);
  };

  // cache le modal de suppresion
  const hideModalDelete = () => {
    setModalDeleteStyle("modalDeleteHidden");
    setIdTaskToDelete("");
  };

  //supprimer la lignet
  //affiche la liste maj
  //cache le modal
  const validateDeleteTaskInDb = async () => {
    //ajouter une tâche
    let task = await deleteTask(idTaskToDelete);
    console.log(task);
    //afficher la liste
    await getAllTasks();

    hideModalDelete();
  };

  const updateTaskCheckbox = async (taskRow: ITasks) => {
    let taskResult = await updateTaskDone(taskRow);
    console.log(taskResult);
    await getAllTasks();
  };

  /* ------ */
  /* Delete */
  /* ------ */

  // const deleteTaskInComponentTasks = async (id: string) => {
  //   //ajouter une tâche
  //   let tasks = await deleteTask(id);
  //   console.log(tasks);
  //   //afficher la liste
  //   await getAllTasks();
  // };

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
      <div id="supprimer" className={modalDeleteStyle}>
        <div id="popup">
          <div id="title">Etes-vous sûr de vouloir supprimer la tâche ?</div>
          <button id="buttonannuler" onClick={() => hideModalDelete()}>
            <div id="text">
              <div id="clear">Annuler</div>
            </div>
          </button>
          <button id="buttonsvalider" onClick={() => validateDeleteTaskInDb()}>
            <div id="text2">
              <div id="go">Valider</div>
            </div>
          </button>
        </div>
      </div>
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
                updateTaskCheckbox={(taskRow: ITasks) =>
                  updateTaskCheckbox(taskRow)
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

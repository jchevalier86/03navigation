import React, { useState, useEffect, useCallback } from "react";
import Logo from "../images/taches.png";
import TaskForm from "../components/TaskFormObject";
import TaskRow from "../components/TaskRow";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTaskDone,
  editTask,
} from "../services/fetchTasks";
import ITask from "../interfaces/ITasks";

const Tasks: React.FC = () => {
  const [listTasks, setListTasks] = useState<ITask[]>([]);
  let tasks = fetchTasks;
  console.log(tasks);
  const [modalDeleteStyle, setModalDeleteStyle] = useState("modalDeleteHidden");
  const [idTaskToDelete, setIdTaskToDelete] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [taskToPass, setTaskToPass] = useState<ITask>({
    title: "",
    date: "",
  });

  /* --- */
  /* Add */
  /* --- */

  const addTaskInComponentTasks = async (
    taskToAdd: ITask,
    isModifiedValue: boolean
  ) => {
    if (isModifiedValue) {
      //modifier une tâche
      let task = await editTask(taskToAdd);
      console.log(task);
      setIsModified(false);
    } else {
      //ajouter une tâche
      let task = await addTask(taskToAdd);
      console.log(task);
      setIsModified(false);
    }
    //afficher la liste
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

  const updateTaskCheckbox = async (taskRow: ITask) => {
    let taskResult = await updateTaskDone(taskRow);
    console.log(taskResult);
    await getAllTasks();
  };

  const updateTaskRow = async (isModified: boolean, taskRow: ITask) => {
    setIsModified(isModified);
    setTaskToPass(taskRow);
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
  const getAllTasks = useCallback(async () => {
    setListTasks([]);
    let list = await fetchTasks();
    setListTasks([...list]);
  }, []);

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

      <TaskForm
        task={taskToPass}
        isModified={isModified}
        addTaskInComponentTasks={(taskToAdd: ITask, isModified: boolean) =>
          addTaskInComponentTasks(taskToAdd, isModified)
        }
      />

      <div>
        {listTasks.map((task: ITask) => {
          return (
            <div key={task._id}>
              {task.title} {task._id}
            </div>
          );
        })}
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
              <th>PRIORITY</th>
              <th>MODIFIER</th>
              <th>SUPPRIMER</th>
            </tr>
          </thead>
          {listTasks.map((taskRow: ITask) => {
            return (
              <TaskRow
                taskRow={taskRow}
                updateTaskRow={(isModified: boolean, taskRow: ITask) =>
                  updateTaskRow(isModified, taskRow)
                }
                deleteTaskInComponentTasks={(id: string) =>
                  deleteTaskInComponentTasks(id)
                }
                updateTaskCheckbox={(taskRow: ITask) =>
                  updateTaskCheckbox(taskRow)
                }
                key={taskRow._id}
              />
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Tasks;

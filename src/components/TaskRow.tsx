import React, { useState } from "react";
import "../styles/App.css";
import ITasks from "../interfaces/ITasks";

type Props = {
  taskRow: ITasks;
  deleteTaskInComponentTasks: (_id: string) => void;
  updateTaskCheckbox: (taskRow: ITasks) => void;
  setTaskRow: React.Dispatch<React.SetStateAction<string>>;
};

const TaskRow: React.FC<any> = (props: Props) => {
  // récupérer le props.taskRow pour ensuite pouvoir modifier le checkbox
  const [taskRow, setTaskRow] = useState(props.taskRow);

  const updateTaskCheckbox = async (doneValue: boolean) => {
    const updatedTaskRow = { ...taskRow, done: doneValue };
    setTaskRow(updatedTaskRow);
    taskRow.done = doneValue;
    props.updateTaskCheckbox(updatedTaskRow);
    console.log("change done value of task");
  };

  const deleteTaskInComponentTasks = async (value: string) => {
    deleteTaskInComponentTasks(taskRow._id!);
  };

  return (
    <tr>
      <td>
        <input
          className="checkbox"
          type="checkbox"
          id="done"
          checked={taskRow.done}
          onChange={(event) => updateTaskCheckbox(event.target.checked)}
          name="done"
        ></input>
        <label>Done</label>
      </td>

      <td>
        <input
          className="text-1"
          type="text"
          id="title"
          value={taskRow.title}
          name="title"
        ></input>
      </td>

      <td>
        <input
          className="text-2"
          type="text"
          id="description"
          value={taskRow.description}
          name="description"
        ></input>
      </td>

      <td>
        <input
          className="date1"
          type="date"
          id="date"
          value={taskRow.date}
          name="date"
        ></input>
      </td>

      <td>
        <button
          type="submit"
          // onClick={() => updateTaskCheckbox("modifier")}
          className="button-modif"
        >
          Modifier
        </button>
      </td>

      <td>
        <button
          type="submit"
          onClick={() => deleteTaskInComponentTasks("suppression")}
          className="button-suppr"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;

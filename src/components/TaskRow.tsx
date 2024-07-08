import React, { useState } from "react";
import "../styles/App.css";
import ITasks from "../interfaces/ITasks";

type Props = {
  taskRow: ITasks;
  deleteTaskInComponentTasks: (_id: string) => void;
  updateTaskCheckbox: (taskRow: ITasks) => void;
  // setTaskRow: React.Dispatch<React.SetStateAction<string>>;
  updateTaskRow: (isModified: boolean, taskRow: ITasks) => void;
};

const TaskRow: React.FC<Props> = (props: Props) => {
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

  const updateTaskRow = async (value: string) => {
    // arguments
    // isModified:boolean
    //task:Itask
    props.updateTaskRow(true, taskRow);
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

      <td>{taskRow.title}</td>

      <td>{taskRow.description}</td>

      <td>{taskRow.date}</td>

      <td>
        <button
          type="submit"
          onClick={() => updateTaskRow("updateRow")}
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

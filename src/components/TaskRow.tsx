import React from "react";
import "../styles/App.css";
import ITasks from "../interfaces/ITasks";

type Props = {
  taskRow: ITasks;
  deleteTaskInComponentTasks: (_id: string) => void;
};

const TaskRow: React.FC<any> = (props: Props) => {
  const updateTaskCheckbox = async (value: boolean) => {};

  const deleteTaskInComponentTasks = async (value: string) => {
    props.deleteTaskInComponentTasks(props.taskRow._id!);
  };

  return (
    <tr>
      <td>
        <input
          className="checkbox"
          type="checkbox"
          id="done"
          checked={props.taskRow.done}
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
          value={props.taskRow.title}
          name="title"
        ></input>
      </td>

      <td>
        <input
          className="text-2"
          type="text"
          id="description"
          value={props.taskRow.description}
          name="description"
        ></input>
      </td>

      <td>
        <input
          className="date1"
          type="date"
          id="date"
          value={props.taskRow.date}
          name="date"
        ></input>
      </td>

      <td>
        <button type="submit" className="button-modif">
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

import ITasks from "../interfaces/ITasks";

export const fetchTasks = async () => {
  const response = await fetch("http://localhost:5000/tasks");
  const tasks = await response.json();
  return tasks;
};

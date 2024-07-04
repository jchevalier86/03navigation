import React, { useState } from "react";
import "../styles/App.css";
//import fetchTask from "../services/fetchTasks";
import ITasks from "../interfaces/ITasks";

const TaskFormObject: React.FC<any> = ({ addTaskInComponentTasks }) => {
  // gestion des erreurs
  const [titleErrorVisible, setTitleErrorVisible] =
    useState("titleErrorHidden");
  const [descriptionErrorVisible, setDescriptionErrorVisible] = useState(
    "descriptionErrorHidden"
  );
  const [dateErrorVisible, setDateErrorVisible] = useState("dateErrorHidden");

  // state pour les champs
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [dateTask, setDateTask] = useState("");
  //   const [done, setDone] = useState(true);

  const [taskForm, setTaskForm] = useState<ITasks>({ title: "", date: "" });

  enum FormFields {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
  }

  function handleChange<T>(value: T, typeField: number): void {
    if (typeField === FormFields.StringField) {
      setTaskForm({ ...taskForm, title: value as string });
    }
    if (typeField === FormFields.TextAreaField) {
      setTaskForm({ ...taskForm, description: value as string });
    }
    if (typeField === FormFields.DateField) {
      setTaskForm({ ...taskForm, date: value as string });
    }
    if (typeField === FormFields.CheckBoxField) {
      setTaskForm({ ...taskForm, done: value as boolean });
    }
  }

  function modifyTask(event: any) {
    event.preventDefault();
    setTitleErrorVisible("titleErrorHidden");
    setDescriptionErrorVisible("descriptionErrorHidden");
    setDateErrorVisible("dateErrorHidden");

    let validate = true;

    // vérifier que le title n'est pas vide
    if (taskForm.title === "") {
      // si erreur l'intitulé, montrer l'erreur
      setTitleErrorVisible("titleErrorVisible");
      validate = false;
    }

    // vérifier que la description n'est pas vide
    if (taskForm.description === "") {
      // si erreur description, montre l'erreur
      setDescriptionErrorVisible("descriptionErrorVisible");
      validate = false;
    }

    // vérifier que la date n'est pas vide
    if (taskForm.date === "") {
      // si erreur date, montre l'erreur
      setDateErrorVisible("dateErrorVisible");
      validate = false;
    }

    if (validate) {
      addTaskInComponentTasks(taskForm);
    }

    // TODO
    // envoyer l'objet tâche au parent pour modifier les données
    // ensuite rappeler dans le parent la liste et l'afficher avec els données créer ou modifier
    return validate;
  }

  // au dessus c'est les traitements
  // au dessous c'est le render
  return (
    <div className="body">
      <form onSubmit={modifyTask}>
        <div>
          <input
            onChange={(event) =>
              handleChange(event.target.value, FormFields.StringField)
            }
            type="text"
            id="title"
            placeholder="Titre *"
            className="intitule"
            value={taskForm.title}
          ></input>
          <div className={titleErrorVisible}>
            Veuillez saisir le champ intitulé
          </div>
        </div>
        <br />

        <div>
          <textarea
            onChange={(event) =>
              handleChange(event.target.value, FormFields.TextAreaField)
            }
            cols={22}
            rows={6}
            id="description"
            placeholder="Description *"
            className="description"
            value={taskForm.description}
          ></textarea>
          <div className={descriptionErrorVisible}>
            Veuillez saisir le champ description
          </div>
        </div>
        <br />

        <div>
          <input
            onChange={(event) =>
              handleChange(event.target.value, FormFields.DateField)
            }
            type="date"
            id="date"
            className="date"
            value={taskForm.date}
          ></input>
          <div className={dateErrorVisible}>Veuillez saisir le champ date</div>
        </div>
        <br />

        <input
          onChange={(event) =>
            handleChange(event.target.checked, FormFields.CheckBoxField)
          }
          type="checkbox"
          id="checkbox1"
          className="checkbox"
          checked={taskForm.done}
        ></input>
        <label>Done</label>
        <br />

        <div className="buttons">
          <input
            type="submit"
            value="Annuler"
            className="button-annuler"
          ></input>

          <input
            type="submit"
            value="Création"
            className="button-creation"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default TaskFormObject;

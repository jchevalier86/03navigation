import React, { useState } from "react";
import "../styles/App.css";

const TaskForm: React.FC = () => {
  // gestion des erreurs
  const [titleErrorVisible, setTitleErrorVisible] =
    useState("titleErrorHidden");
  const [descriptionErrorVisible, setDescriptionErrorVisible] = useState(
    "descriptionErrorHidden"
  );
  const [dateErrorVisible, setDateErrorVisible] = useState("dateErrorHidden");

  // state pour les champs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTask, setDateTask] = useState("");
  const [done, setDone] = useState(true);

  enum FormFields {
    StringField,
    TextAreaField,
    DateField,
    CheckBoxField,
    RadioButtonField,
  }

  function handleChange<T>(value: T, typeField: number): void {
    if (typeField === FormFields.StringField) {
      setTitle(value as string);
    }
    if (typeField === FormFields.TextAreaField) {
      setDescription(value as string);
    }
    if (typeField === FormFields.DateField) {
      setDateTask(value as string);
    }
    if (typeField === FormFields.CheckBoxField) {
      setDone(value as boolean);
    }
    if (typeField === FormFields.RadioButtonField) {
      setDone(value as boolean);
    }
  }

  function modifyTask(event: any) {
    event.preventDefault();
    setTitleErrorVisible("titleErrorHidden");
    setDescriptionErrorVisible("descriptionErrorHidden");
    setDateErrorVisible("dateErrorHidden");

    let validate = true;

    // vérifier que le title n'est pas vide
    if (title === "") {
      // si erreur l'intitulé, montrer l'erreur
      setTitleErrorVisible("titleErrorVisible");
      validate = false;
    }

    // vérifier que la description n'est pas vide
    if (description === "") {
      // si erreur description, montre l'erreur
      setDescriptionErrorVisible("descriptionErrorVisible");
      validate = false;
    }

    // vérifier que la date n'est pas vide
    if (dateTask === "") {
      // si erreur date, montre l'erreur
      setDateErrorVisible("dateErrorVisible");
      validate = false;
    }

    return validate;
  }

  // au dessus c'est les traitements
  // au dessous c'est le render
  return (
    <>
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
            value={title}
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
            value={description}
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
            value={dateTask}
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
          checked={done}
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
    </>
  );
};

export default TaskForm;

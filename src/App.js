import React, { useState } from "react";
import Search from "./images/search.png";
import "./App.css";

// tableau de données exemples pour l'initialisation, on stocke chaque tache sous forme d'objet avec les attributs suivants
// name : nom de la tache
// done : true / false si true le texte sera barré
const tab = [
  { name: "Publier ToDo list sur Netlify", done: true },
  { name: "Réaliser un projet démineur", done: false }
];

function App() {
  const [tasks, setTasks] = useState(tab);
  const [taskInput, setTaskInput] = useState(""); // saisie nouvelle tache
  const [taskFilter, setTaskFilter] = useState(""); // saisie d'un filtre de recherche

  const handleSubmit = event => {
    event.preventDefault();

    if (taskInput.trim() !== "") {
      // Copie du tableau d'origine et ajout du nouvel élément
      const newTasks = [...tasks];
      newTasks.push({ name: taskInput, done: false });
      setTasks(newTasks);
    }
    setTaskInput("");
  };

  const onDeleteClick = indexToDel => {
    // On récupère un nouveau tableau qui contient tout sauf l'indice qui correspond à indexToDel
    const newTasks = tasks.filter((item, index) => index !== indexToDel);
    setTasks(newTasks);
  };

  const onItemClick = idxDone => {
    const newTasks = [...tasks];
    newTasks[idxDone].done = !newTasks[idxDone].done; // on inverse la valeur de l'attribut done
    setTasks(newTasks);
  };

  const getTasks = () => {
    // 1° On filtre en fonction du critère de recherche ( on prend si le texte saisi est présent dans le name )
    const taskSearch = tasks.filter(
      item => taskFilter === "" || item.name.includes(taskFilter)
    );

    // 2° Pour mettre les taches effectués en bas, on crée 2 tableaux séparés en fonction de l'attribut done
    const taskActive = taskSearch.filter(item => !item.done); // liste des taches qui ne sont pas à done
    const taskDone = taskSearch.filter(item => item.done);
    // on concatène les 2 tableaux en mettant taskDone en dernier
    const taskAll = [...taskActive, ...taskDone];

    // 3° On passe par un map pour générer les tasks à afficher
    if (taskAll.length > 0) {
      const element = taskAll.map((item, index) => {
        return (
          <div key={index} className="taskItem">
            <svg
              className="btnDel"
              onClick={() => onDeleteClick(index)}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ccc"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span
              className={"myTask " + (item.done ? "taskDone" : "")}
              onClick={() => onItemClick(index)}
            >
              {item.name}
            </span>
          </div>
        );
      });
      return <div className="listItems">{element} </div>;
    }
  };

  return (
    <div className="App">
      <h1> To-Do list</h1>

      <div className="container">
        <div style={{ position: "relative" }}>
          <input
            className="search"
            onChange={event => setTaskFilter(event.target.value)}
            type="text"
            value={taskFilter}
          />
          <img
            className="searchImg"
            style={{
              left: 5,
              top: "16px"
            }}
            src={Search}
            alt="search"
          />
          <svg
            className="clearSearch"
            onClick={() => setTaskFilter("")}
            style={{ position: "absolute", right: 5, top: "21px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      </div>

      {/* <div className="listItems">{getTasks()} </div> */}
      {getTasks()}
      <div className="todoForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputTask"
            placeholder="Nouvelle tâche"
            type="text"
            value={taskInput}
            onChange={event => setTaskInput(event.target.value)}
          />
          <input id="submitTask" type="submit" value="Ajouter une tâche" />
        </form>
      </div>
    </div>
  );
}

export default App;

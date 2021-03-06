import React, { useState } from "react";
import Search from "./images/search.png";
import "./App.css";

// tableau de données exemples pour l'initialisation, on stocke chaque tache sous forme d'objet avec les attributs suivants
// name : nom de la tache
// done : true / false si true le texte sera barré
let numId = 0;
const getNewNum = () => numId++; // incrément du numéro à chaque appel

const tab = [
  { name: "Réaliser un projet démineur", done: false, id: getNewNum() },
  { name: "Publier ToDo list sur Netlify", done: true, id: getNewNum() }
];

function App() {
  const [tasks, setTasks] = useState(tab);
  const [taskInput, setTaskInput] = useState(""); // saisie nouvelle tache
  const [taskFilter, setTaskFilter] = useState(""); // saisie d'un filtre de recherche
  const [taskErrorMsg, setTaskErrorMsg] = useState(""); // saisie d'un filtre de recherche

  const getIndexFromId = idToFind => {
    return tasks.findIndex(obj => obj.id === idToFind);
  };

  const onChangeInput = newInput => {
    let errorMsg = "";
    if (newInput !== "" && newInput.trim() === "") {
      errorMsg = "Création de tâche vide non autorisée !!";
    } else {
      // vérif si on a une tache de même nom
      const id = tasks.findIndex(
        obj => obj.name.toLowerCase() === newInput.toLowerCase()
      );
      if (id >= 0) {
        errorMsg = "Une tâche de même nom existe déja";
      }
    }
    setTaskErrorMsg(errorMsg);
    setTaskInput(newInput);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (taskInput.trim() !== "") {
      // vérif si on a une tache de même nom
      const id = tasks.findIndex(
        obj => obj.name.toLowerCase() === taskInput.toLowerCase()
      );

      if (id >= 0) {
        alert("Une tâche de même nom existe déja");
      } else {
        // Copie du tableau d'origine et ajout du nouvel élément
        const newTasks = [...tasks];
        newTasks.push({ name: taskInput, done: false, id: getNewNum() });
        setTasks(newTasks);
        setTaskInput("");
      }
    } else {
      alert("Création de tâche vide non autorisée !!");
    }
  };

  const onDeleteClick = idToDel => {
    let idxTodel = getIndexFromId(idToDel);
    if (idxTodel >= 0) {
      // On récupère un nouveau tableau qui contient tout sauf l'indice qui correspond à indexToDel
      const newTasks = tasks.filter((item, index) => index !== idxTodel);
      setTasks(newTasks);
    }
  };

  const onItemClick = idDone => {
    const newTasks = [...tasks];
    let idx = getIndexFromId(idDone);
    if (idx >= 0) {
      newTasks[idx].done = !newTasks[idx].done; // on inverse la valeur de l'attribut done
      setTasks(newTasks);
    }
  };

  const getTasks = () => {
    // 1° On filtre en fonction du critère de recherche ( on prend si le texte saisi est présent dans le name )
    const taskSearch = tasks.filter(
      item =>
        taskFilter === "" ||
        item.name.toLowerCase().includes(taskFilter.toLowerCase())
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
          <div idx={item.id} key={item.id} className="taskItem">
            <svg
              className="btnDel"
              onClick={() => onDeleteClick(item.id)}
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
              onClick={() => onItemClick(item.id)}
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

      {getTasks()}
      <div className="todoForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputTask"
            placeholder="Nouvelle tâche"
            type="text"
            value={taskInput}
            // onChange={event => setTaskInput(event.target.value)}
            onChange={event => onChangeInput(event.target.value)}
          />
          <input id="submitTask" type="submit" value="Ajouter une tâche" />
        </form>
      </div>
      <div className="errorMsg">{taskErrorMsg} </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";

// tableau de données exemples pour l'initialisation, on stocke chaque tache sous forme d'objet avec les attributs suivants
// name : nom de la tache
// done : true / false si true le texte sera barré
const tab = [
  { name: "Faire les courses", done: true },
  { name: "Sortir le chien", done: false }
];

function App() {
  const [tasks, setTasks] = useState(tab);
  const [taskInput, setTaskInput] = useState(""); // saisie nouvelle tache
  const [taskFilter, setTaskFilter] = useState(""); // saisie d'un filtre de recherche

  const handleSubmit = event => {
    event.preventDefault();
    // copy du tableau d'origine et ajout du nouvel élément
    const newTasks = [...tasks];
    newTasks.push({ name: taskInput, done: false });
    setTasks(newTasks);
  };

  const onDeleteClick = indexToDel => {
    // on récupère un nouveau tableau qui contient tout sauf l'indice qui correspond à indexToDel
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
    const element = taskAll.map((item, index) => {
      return (
        <div key={index} className="taskItem">
          <span className="btnDel" onClick={() => onDeleteClick(index)}>
            X
          </span>
          <span
            className={"myTask " + (item.done ? "taskDone" : "")}
            onClick={() => onItemClick(index)}
          >
            {item.name}
          </span>
        </div>
      );
    });
    return element; // liste des taches à afficher après recherche et tri
  };

  return (
    <div className="App">
      <h1> To-Do list</h1>
      <input
        className="search"
        onChange={event => setTaskFilter(event.target.value)}
        type="text"
      />

      <div className="listItems">{getTasks()}</div>
      <div className="todoForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputTask"
            placeholder="Titre"
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

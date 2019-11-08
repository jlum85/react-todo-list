import React, { useState } from "react";
import "./App.css";

let numOrder = -1;
const getNewNum = () => {
  numOrder++;
  return numOrder;
};

// tableau de données exemples pour l'initialisation , on stocke chaque tache sous forme d'objet avec les attributs suivants
// addOrder = numéro d'ajout dans la liste
// name : nom de la tache
// done : true / false si true le texte  sera  barré
const tab = [
  { addOrder: getNewNum(), name: "faire les courses", done: true },
  { addOrder: getNewNum(), name: "sortir le chien", done: false }
];

function App() {
  const [tasks, setTasks] = useState(tab);
  const [taskInput, setTaskInput] = useState("");
  const [taskFilter, setTaskFilter] = useState("");

  // on obtient l'indice de l'objet à modifier en fonction de son nom
  const getIndexTask = name => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === name) {
        return i;
      }
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // copy du tableau d'origine et ajout du nouvel élément
    const newTasks = [...tasks];
    newTasks.push({ addOrder: getNewNum(), name: taskInput, done: false });
    setTasks(newTasks);
  };

  const onDeleteClick = event => {
    const indexToDel = parseInt(event.target.getAttribute("idx"));
    console.log("Delete: " + indexToDel + " , " + tasks[indexToDel].name);
    const newTasks = tasks.filter((item, index) => {
      return index !== indexToDel;
    });
    setTasks(newTasks);
  };

  const onItemClick = event => {
    const index = getIndexTask(event.target.innerText);
    if (index >= 0) {
      const newTasks = [...tasks];
      newTasks[index].done = !newTasks[index].done;
      setTasks(newTasks);
    }
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
          <span className="btnDel" idx={index} onClick={onDeleteClick}>
            X
          </span>

          <span
            className="myTask"
            style={{
              textDecoration: item.done ? "line-through" : ""
            }}
            onClick={onItemClick}
          >
            {item.name}
          </span>
        </div>
      );
    });
    return element;
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

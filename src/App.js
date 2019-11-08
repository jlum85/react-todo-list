import React, { useState } from "react";
import "./App.css";

const tab = [
  { name: "faire les courses", done: false },
  { name: "sortir le chien", done: false }
];

function App() {
  const [tasks, setTasks] = useState(tab);
  const [taskInput, setTaskInput] = useState("");

  // on obtient l'indice de l'objet à modifier en fonction de son nom
  const getIndexTask = name => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].name === name) {
        return i;
      }
    }
  };

  const handleSubmit = event => {
    console.log("onsubmit");
    event.preventDefault();
    const newTasks = [...tasks];
    newTasks.push({ name: taskInput, done: false });
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
    console.log("Done : " + index + " , " + event.target.innerText);
    if (index >= 0) {
      const newTasks = [...tasks];
      newTasks[index].done = true;
      setTasks(newTasks);
    }
  };

  // key={index}
  const element = tasks.map((item, index) => {
    return (
      <div key={index} className="taskItem">
        <span idx={index} onClick={onDeleteClick}>
          X
        </span>

        <span
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

  return (
    <div className="App">
      <h1> To-Do list</h1>

      <div className="listItems">{element}</div>
      <div className="todoForm">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Titre"
            type="text"
            // name="todo"
            value={taskInput}
            onChange={event => {
              setTaskInput(event.target.value);
            }}
          />
          <input id="submitTask" type="submit" value="Ajouter une tâche" />
        </form>
      </div>
    </div>
  );
}

export default App;

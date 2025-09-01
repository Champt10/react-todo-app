import React, { useState } from "react";
import "./App.css";
import { FaMoon, FaSun } from "react-icons/fa";

const filters = {
  all: "all",
  active: "active",
  completed: "completed",
};

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState(filters.all);
  const [dark, setDark] = useState(false);

  function addTask() {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(), 
      text: text.trim(), 
      date: new Date().toLocaleDateString(), 
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setText(""); 
  }

 
  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleDone(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.done));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === filters.active) return !task.done; // only active
    if (filter === filters.completed) return task.done; // only completed
    return true; // all tasks
  });

  const activeCount = tasks.filter((task) => !task.done).length;
  const hasCompleted = tasks.some((task) => task.done);

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <h1>My To-Do List</h1>

      <div className="input-container">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <span className="count">{activeCount} left</span>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === filters.all ? "active" : ""}`}
            onClick={() => setFilter(filters.all)}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === filters.active ? "active" : ""}`}
            onClick={() => setFilter(filters.active)}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === filters.completed ? "active" : ""}`}
            onClick={() => setFilter(filters.completed)}
          >
            Completed
          </button>
        </div>

        <div className="actions-right">
          <button
            className="clear-btn"
            onClick={clearCompleted}
            disabled={!hasCompleted}
            title={hasCompleted ? "Remove all completed tasks" : "No completed tasks"}
          >
            Clear Completed
          </button>

          <button
            className="dark-toggle"
            onClick={() => setDark(!dark)} // toggle dark
            title="Toggle dark mode"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <label className="item-left">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span className={`task-text ${task.done ? "completed" : ""}`}>
                {task.text}
              </span>
              <sub className="task-date">{task.date}</sub>
            </label>

            <button
              className="delete-btn"
              onClick={() => removeTask(task.id)}
              aria-label="Delete task"
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

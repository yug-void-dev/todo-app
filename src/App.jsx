import { useEffect, useState } from "react";
import "./App.css";
import Update from "./components/Update";
import EditButtons from "./components/EditButtons";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoData")) || []
  );
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completedData")) || []
  );
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos));
    localStorage.setItem("completedData", JSON.stringify(completed));
  }, [todos, completed]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  function removeTodo(removeIndex) {
    setTodos(todos.filter((_, index) => index !== removeIndex));
    setCompleted(
      completed
        .filter((i) => i !== removeIndex)
        .map((i) => (i > removeIndex ? i - 1 : i))
    );
  }

  function updateTask(i) {
    setEditingIndex(i);
    setUpdatedTask(todos[i]);
  }

  const checkHandler = (index) => (e) => {
    if (e.target.checked) {
      if (!completed.includes(index)) {
        setCompleted([...completed, index]);
      }
    } else {
      setCompleted(completed.filter((i) => i !== index));
    }
  };

  return (
    <div id="main">
      <h1>Yug's ToDo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          onChange={(e) => setTask(e.target.value)}
          type="text"
          placeholder="Enter your Task"
          value={task}
        />
        <button type="submit">Add</button>
      </form>
      <p>
        You have {todos.length - completed.length} task
        {todos.length - completed.length !== 1 ? "s" : ""} pending
      </p>
      {todos.map((todo, index) => (
        <div key={index} className="todos">
          {index === editingIndex ? (
            <Update setUpdatedTask={setUpdatedTask} updatedTask={updatedTask} />
          ) : (
            <div className="todo">
              <input
                type="checkbox"
                checked={completed.includes(index)}
                onChange={checkHandler(index)}
              />
              <p
                style={{
                  textDecoration: completed.includes(index)
                    ? "line-through"
                    : "none",
                  opacity: completed.includes(index) ? 0.6 : 1,
                }}
              >
                {todo}
              </p>
            </div>
          )}
          {index === editingIndex ? (
            <EditButtons
              setTodos={setTodos}
              updatedTask={updatedTask}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          ) : (
            <div className="controls">
              <button className="btn" onClick={() => removeTodo(index)}>
                Remove
              </button>
              <button
                onClick={() => updateTask(index)}
                className="btn"
                style={{ backgroundColor: "skyblue" }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Update from "./components/Update";
import EditButtons from "./components/EditButtons";

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoData")) || []
  );
  const [task, setTask] = useState("");
  const [count, setCount] = useState(todos.length);
  const [flag, setFlag] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    setCount(count + 1);
    setTodos([...todos, task]);
    setTask("");
  };

  function removeTodo(removeIndex) {
    if (count > 0) {
      setCount(count - 1);
    }
    setTodos(todos.filter((todo, index) => index !== removeIndex));
  }
  function updateTask(i) {
    setEditingIndex(i);
    setFlag(false);
  }

  const checkHandler = (e) => {
    if (e.target.checked) {
      if (count > 0) {
        setCount(count - 1);
      }
    } else {
      setCount(count + 1);
      setStyles({ textDecoration: "none" });
    }
  };
  return (
    <div id="main">
      <h1>Yug's ToDo List</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={(e) => {
            flag ? setTask(e.target.value) : setTask(updatedTask);
          }}
          type="text"
          placeholder="Enter your Task"
          value={task}
        />
        <button onClick={addTask}>Add</button>
      </form>
      <p>You Have {count} task pending</p>
      {todos.map((todo, index) => (
        <div key={index} className="todos">
          {index === editingIndex ? (
            <Update setUpdatedTask={setUpdatedTask} updatedTask={updatedTask} />
          ) : (
            <div className="todo">
              <input type="checkbox" onClick={checkHandler} />
              <p>{todo}</p>
            </div>
          )}
          {index === editingIndex ? (
            <EditButtons
              setTodos={setTodos}
              setFlag={setFlag}
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
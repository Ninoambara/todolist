import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = (e) => {
    e.preventDefault()
    if (todoText.trim() !== "") {
      setTodos([...todos, todoText]);
      setTodoText("");
    }
  };

  const removeTodo = (index) => {
    const removeItem = [...todos];
    removeItem.splice(index, 1);
    setTodos(removeItem);
  };

  return (
    <div className="flex justify-center">
      <div className="py-10 px-16 rounded-lg mt-10">
        <h1 className="shadow-2xl px-11 text-5xl text-white">TODOLIST</h1>
        <div>
          <form onSubmit={addTodo}>
            <input
              className="text-white shadow-2xl px-4 py-4 mt-10 border border-white rounded-md"
              placeholder="Add new"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button
              type="submit"
              className="button border hover:text-white rounded-md text-slate-400 border-white px-6 py-4 ml-5"
            >
              Add
            </button>
          </form>
        </div>

        <div className=" text-white mt-10">
          <div>
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-blue-200 hover:bg-blue-100 text-black p-2 rounded-md mt-2 py-5"
              >
                {todo}
                <button
                  className="bg-red-500 text-white px-2 ml-2 rounded-md"
                  onClick={() => removeTodo(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

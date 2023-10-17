import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      setTodos([...todos, { name: todoText, checked: false }]);
      setTodoText("");

      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, { name: todoText, checked: false }])
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const doneTodo = (index) => {
    const doneTodo = [...todos];
    doneTodo[index].checked = !doneTodo[index].checked;
    setTodos(doneTodo);

    localStorage.setItem("todos", JSON.stringify(doneTodo));
  };

  const removeTodo = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const removeItem = [...todos];
        removeItem.splice(index, 1);
        setTodos(removeItem);

        localStorage.setItem("todos", JSON.stringify(removeItem));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="py-10 max-[512px]:px-4 px-16 rounded-lg mt-10">
        <h1 className="shadow-2xl px-20 text-5xl border-b-2 text-white">
          TODOLIST
        </h1>
        <div>
          <form onSubmit={addTodo}>
            <input
              className="text-white shadow-2xl px-10 py-4 mt-10 border max-[512px]:px-5 bg-[#242424] border-white rounded-md"
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
                className="flex button transition-all duration-300 justify-between items-center border border-white text-white p-3 rounded-md mt-2 py-5"
              >
                {todo.checked ? (
                  <div className="line-through decoration-2">{todo.name}</div>
                ) : (
                  todo.name
                )}
                <div>
                  {todo.checked ? (
                    <button
                      className="bg-green-500 border border-green-500 hover:bg-green-400 text-white px-2 py-0 ml-2 rounded-md"
                      onClick={() => doneTodo(index)}
                    >
                      <i class="fa-solid fa-check fa-xs"></i>
                    </button>
                  ) : (
                    <button
                      className=" border border-white  text-white px-2 ml-2 rounded-md"
                      onClick={() => doneTodo(index)}
                    >
                      <i class="fa-solid fa-check fa-xs"></i>
                    </button>
                  )}

                  <button
                    className="bg-red-500 hover:bg-red-400 text-white px-2 ml-2 rounded-md"
                    onClick={() => removeTodo(index)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

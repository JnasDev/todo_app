import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todo.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo() {
    const updatedItems = todos.map((item) => {
      if (item.id === currentTodo.id) {
        return { ...item, text: currentTodo.text };
      }
      return item;
    });

    setIsEditing(false);
    setTodos(updatedItems);
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo();
  }

  console.log(todos);

  return (
    <>
      <div className="App flex flex-col items-center text-center mt-[256px]">
        <h1 className="text-[56px] font-semibold">Todo App</h1>

        {isEditing ? (
          <form onSubmit={handleEditFormSubmit} className="">
            <h2 className="text-blue-400 font-semibold">Edit Todo</h2>
            <label className="text-red-500 font-bold" htmlFor="editTodo">
              Edit todo:{" "}
            </label>
            <input
              className="border-2 rounded-lg px-2"
              type="text"
              name="editTodo"
              placeholder="Edit todo"
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />

            <button
              className="ml-2 bg-green-600 text-white px-3 py-0.5 rounded-lg"
              type="submit"
            >
              Update
            </button>
            <button
              className="ml-2 bg-red-500 text-white px-3 py-0.5 rounded-lg"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="border-2 border-black rounded-[8px_0px_0px_8px] px-4 py-1"
              type="text"
              name="todo"
              placeholder="Create a new Todo"
              value={todo}
              onChange={handleInputChange}
            />
            <button className="border-2 py-1 px-4 border-black" type="submit">
              Add
            </button>
          </form>
        )}
        <ul className="todolist">
          {todos.map((todo) => (
            <li className="mt-8 font-medium flex" key={todo.id}>
              <p className="bg-blue-400 px-4 rounded-xl text-[28px]">
                {todo.text}
              </p>
              <button
                onClick={() => handleEditClick(todo)}
                className="ml-4 bg-red-500 px-4 font-semibold text-white rounded-xl"
              >
                Edit
              </button>
              <button
                className="ml-4 bg-red-500 px-4 font-semibold text-white rounded-xl"
                onClick={() => handleDeleteClick(todo.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

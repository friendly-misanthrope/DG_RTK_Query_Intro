import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetToDosQuery } from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  // renamed data with 'toDos' alias, destructured props from custom query hook
  const {
    data: toDos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetToDosQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from 'react-loader-spinner';
import { useState } from "react";
import { useGetToDosQuery } from '../api/apiSlice';

const ToDoList = () => {
  const [newToDo, setNewToDo] = useState('');

  // Destructure query responses with custom query hook
  const {
    data: toDos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetToDosQuery();

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setNewToDo('');
  }

  // Add ToDo form
  const newItemSection =
    <form onSubmit={() => handleSubmit}>
      <label htmlFor="new-todo">Enter a new ToDo item:</label>
      <div className="new-todo">
        <input
        type="text"
        id="new-todo"
        value={newToDo}
        onChange={() => setNewToDo(e.target.value)}
        placeholder = "Enter a new ToDo" />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>

  // Conditional content rendering based on response from useGetToDosQuery()
  let content;
  
  if (isLoading) {
    content = 
    <>
      <p className="loader">Loading...</p>
      <div className="loader">
        <BallTriangle
        height={100}
        color = "#61dbfb" />
      </div>
    </>
  } else if (isSuccess) {
    content = JSON.stringify(toDos);
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <main>
      <h1>ToDo List</h1>
      {newItemSection}
      {content}
    </main>
  )
}
export default ToDoList;
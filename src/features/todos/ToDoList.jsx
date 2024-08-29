import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from 'react-loader-spinner';
import { useState } from "react";
import { 
  useGetToDosQuery,
  useAddToDoMutation,
  useUpdateToDoMutation,
  useDeleteToDoMutation
} from '../api/apiSlice';

const ToDoList = () => {
  const [newToDo, setNewToDo] = useState('');

  // Destructure props from query response
  const {
    data: toDos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetToDosQuery();

  // RTK Query C/U/D Fns
  const [addToDo] = useAddToDoMutation();
  const [updateToDo] = useUpdateToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo({ userId: 1, title: newToDo, isComplete: false });
    setNewToDo('');
  }

  // Add ToDo form
  const newItemSection =
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new ToDo item:</label>
      <div className="new-todo">
        <input
        type="text"
        id="new-todo"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
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
    content = toDos.map((toDo) => {
      return (
        <article key={toDo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={toDo.isComplete}
              id={toDo.id}
              onChange={() => updateToDo({ ...toDo, isComplete: !toDo.isComplete })}
            />
            <label htmlFor={toDo.id}>{toDo.title}</label>
          </div>
        <button
        className="trash"
        onClick={() => deleteToDo({ id: toDo.id })}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        </article>
      )
    })
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
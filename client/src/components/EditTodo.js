import React, { useState } from "react";

const EditTodo = ({ todo, editTodo }) => {
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    editTodo(todo.id, { title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditTodo;

import React from "react";

const ListTodos = ({ todos, editTodoItem, deleteTodo }) => {
  return (
    <ul className="list-group">
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>{todo.title}</span>
              </div>
              <div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => editTodoItem(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="list-group-item">No todos to display</li>
      )}
    </ul>
  );
};

export default ListTodos;

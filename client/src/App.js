
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import InputTodo from "./components/InputTodo";
import EditTodo from "./components/EditTodo";
import ListTodos from "./components/ListTodos";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodoState, setEditTodoState] = useState({ id: null, title: "" });

  // Fetch all todos from backend on component mount
  useEffect(() => {
    getTodos();
  }, []);

  // Function to fetch all todos
  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to create a new todo
  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post("http://localhost:3000/todos", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to set the todo to edit
  const editTodoItem = (todo) => {
    setEditTodoState({
      id: todo.id,
      title: todo.title,
    });
  };

  // Function to handle editing a todo
  const handleEditTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      setTodos(updatedTodos);
      setEditTodoState({ id: null, title: "" });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Todo List</h1>
        <InputTodo addTodo={addTodo} />
        <ListTodos todos={todos} editTodoItem={editTodoItem} deleteTodo={deleteTodo} />
        {editTodoState.id && (
          <EditTodo todo={editTodoState} editTodo={handleEditTodo} />
        )}
      </div>
    </Fragment>
  );
}

export default App;


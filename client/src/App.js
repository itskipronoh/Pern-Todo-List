import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputTodo from './components/InputTodo';
import EditTodo from './components/EditTodo';
import ListTodos from './components/ListTodos';

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodoState, setEditTodoState] = useState({ id: null, title: '', description: '', completed: false });

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:3000/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodoItem = (todo) => {
    setEditTodoState({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    });
  };

  const handleEditTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      setTodos(updatedTodos);
      setEditTodoState({ id: null, title: '', description: '', completed: false });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo List</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <InputTodo addTodo={addTodo} />
          <ListTodos todos={todos} editTodoItem={editTodoItem} deleteTodo={deleteTodo} />
          {editTodoState.id && (
            <EditTodo todo={editTodoState} editTodo={handleEditTodo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post('http://localhost:5000/todos', 
            { task: newTask }, // The Body
            { headers: { Authorization: `Bearer ${token}` } } // The Auth
        );

        // UI Trick: Add the new todo to the existing list immediately
        setTodos([...todos, response.data]); 
        setNewTask(""); // Clear the input
    } catch (err) {
        console.error("Error adding task:", err);
    }
};

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // 1. Get the "wristband" from storage
        const token = localStorage.getItem('token');

        // 2. Send the request with the Authorization Header
        const response = await axios.get('http://localhost:5000/todos', {
          headers: {
            Authorization: `Bearer ${token}` // Critical line!
          }
        });

        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Your Private Tasks</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.task} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
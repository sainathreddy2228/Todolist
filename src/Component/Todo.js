import React, { useState } from "react";

import "./index.css";

const Todo = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [userNetworkDetails, setUserNetworkDetails] = useState("");

  const handleLogin = async () => {
    if (username === "admin" && password === "admin") {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserNetworkDetails(data.ip);
      } catch (error) {
        console.error("Error fetching network details:", error);
      }

      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      setTodos([...todos, todoInput]);
      setTodoInput("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleLogout = () => {
    setUsername("");
    setPassword("");
    setIsLoggedIn(false);
    setUserNetworkDetails("");
    console.log({ userNetworkDetails });
  };

  return (
    <div className={`app-container ${isLoggedIn ? "logged-in" : ""}`}>
      {!isLoggedIn ? (
        // Login Section
        <div className="login-section">
          <h2>Login</h2>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <br />
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </div>
      ) : (
        // Todo List Section
        <div className="todo-list-section">
          <div className="header-container">
            <h2 className="welcome-message">Welcome, {username}!</h2>

            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
          <h2>Todo List</h2>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAddTodo} className="add-todo-button">
            Add Todo
          </button>
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <span
                  onClick={() => handleDeleteTodo(index)}
                  className="delete-todo"
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Todo;

import React, { useState, useEffect } from "react";

export const todoUrl = "https://jsonplaceholder.typicode.com/todos";
export const userUrl = "https://jsonplaceholder.typicode.com/users";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => retrieveTodos(), []);

  const retrieveTodos = async () => {
    const todoResponse = await fetch(todoUrl);
    const userResponse = await fetch(userUrl);

    if (todoResponse.status === 500) {
      setHasError(true);
      return;
    }

    const todos = await todoResponse.json();
    const users = await userResponse.json();

    todos.forEach((todo) => {
      const user = users.find((user) => user.id === todo.userId);
      todo.user = user;
    });

    setTodos(todos);
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>User: {todo.user.name}</span>
            <span>Todo: {todo.title}</span>
            <span>Completed? {todo.completed ? "Yes" : "No"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

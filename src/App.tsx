import React, { useState } from "react";
import { Todo } from "./types";
import TodoItem from "./components/TodoItem";
import "./App.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filter, setFilter] = useState<string>("all");

  // addTodo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  // delete
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggleTodo
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // editTodo
  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // sort
  const sortTodos = (order: string) => {
    setSortOrder(order);
    setTodos(
      [...todos].sort((a, b) => {
        if (order === "asc") {
          return a.text.localeCompare(b.text);
        } else {
          return b.text.localeCompare(a.text);
        }
      })
    );
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "incomplete") {
      return !todo.completed;
    }
    return true;
  });

  console.log(todos);

  return (
    <div>
      <h1>TODOアプリ</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>TODOを追加</button>
      <button onClick={() => sortTodos(sortOrder === "asc" ? "desc" : "asc")}>
        {sortOrder === "asc" ? "降順にソート" : "昇順にソート"}
      </button>

      <div>
        <button onClick={() => setFilter("all")}>すべて表示</button>
        <button onClick={() => setFilter("completed")}>完了済み</button>
        <button onClick={() => setFilter("incomplete")}>未完了</button>
      </div>

      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
};
export default App;

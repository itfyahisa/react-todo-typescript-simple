import React, { useState } from "react";
import { Todo } from "../types";

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({todo, onDelete, onToggle, onEdit,}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const handleEdit = () => {
        onEdit(todo.id, editText);
        setIsEditing(false);
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                </span>
            )}
            {isEditing ? (
                <button onClick={handleEdit}>Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
    );
};
export default TodoItem;

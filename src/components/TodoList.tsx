'use client';

import { useState, useEffect } from 'react';

interface Todo {
    _id: string;
    task: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState('');

    const fetchTodos = async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        setTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!task.trim()) return;
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task }),
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
        setTask('');
    };

    const toggleTodo = async (id: string, completed: boolean) => {
        const res = await fetch('/api/todos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, completed: !completed }),
        });
        const updatedTodo = await res.json();
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    };

    const deleteTodo = async (id: string) => {
        await fetch(`/api/todos?id=${id}`, { method: 'DELETE' });
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="flex-grow border border-gray-300 p-2 rounded-l-md"
                    placeholder="Add a new task"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white p-2 rounded-r-md"
                >
                    Add
                </button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id} className="flex items-center justify-between mb-2">
                        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                            {todo.task}
                        </span>
                        <div>
                            <button
                                onClick={() => toggleTodo(todo._id, todo.completed)}
                                className="bg-green-500 text-white px-3 py-1 mr-2 rounded-md"
                            >
                                {todo.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

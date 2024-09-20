import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, editTodo, toggleImportant } from './todos/todoSlice';
import './index.css';

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [newEditText, setNewEditText] = useState('');
  const todoList = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const addNewTask = () => {
    if (taskText.trim()) {
      dispatch(addTodo(taskText));
      setTaskText('');
    }
  };

  const removeTask = (id) => {
    dispatch(removeTodo(id));
  };

  const toggleTaskCompletion = (id) => {
    dispatch(toggleTodo(id));
  };

  const saveTaskEdit = () => {
    if (newEditText.trim()) {
      dispatch(editTodo({ id: currentEditId, text: newEditText }));
      setCurrentEditId(null);
      setNewEditText('');
    }
  };

  const markAsImportant = (id) => {
    dispatch(toggleImportant(id));
  };

  return (
    <div>
      <h1>NOTES</h1>
      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="введите ваши задачи"
      />
      <button onClick={addNewTask} className='click'>Add</button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todoList.map(todo => (
          <li key={todo.id} style={{ color: todo.important ? 'blue' : 'black', marginBottom: '10px' }}>
            <input 
              type="checkbox"
              onChange={() => {}}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginRight: '10px' }}
              onClick={() => toggleTaskCompletion(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTask(todo.id)}>удалить</button>
            <button onClick={() => { setCurrentEditId(todo.id); setNewEditText(todo.text); }}>изменить</button>
            <button
              onClick={() => markAsImportant(todo.id)}
              style={{
                backgroundColor: 'transparent',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              избранные
            </button>
          </li>
        ))}
      </ul>

      {currentEditId !== null && (
        <div>
          <input
            type="text"
            value={newEditText}
            onChange={e => setNewEditText(e.target.value)}
          />
          <button onClick={saveTaskEdit}>сохранить</button>
          <button onClick={() => setCurrentEditId(null)}>отмена</button>
        </div>
      )}
    </div>
  );
};

export default App;

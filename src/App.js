import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, editTodo, toggleImportant } from './todos/todoSlice';
import './index.css'

function App() {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleRemoveTodo = id => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: editId, text: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const handleToggleImportant = id => {
    dispatch(toggleImportant(id));
  };

  return (
    <div>
      <h1>NOTES</h1>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="введите ваши задачи"
      />
      <button onClick={handleAddTodo} className='click'>Add</button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ color: todo.important ? 'blue' : 'black', marginBottom: '10px' }}>

<input type="checkbox"
                onChange={() =>{
                }} 
                />

              
            <span
               style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginRight: '10px' }}
               onClick={() => handleToggleTodo(todo.id)}
             >
            
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(todo.id)}>удалить</button>
            <button onClick={() => { setEditId(todo.id); setEditText(todo.text); }}>изменить</button>
            <button  
              onClick={() => handleToggleImportant(todo.id)}
              style={{
                backgroundColor: 'transparent',
                cursor: 'pointer',
                marginLeft: '10px',
                
              }}
            >избранные
              </button>
          </li>
        ))}
      </ul>

      {editId !== null && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button onClick={handleEditTodo}>сохранить</button>
          <button onClick={() => setEditId(null)}>удалить</button>
        </div>
      )}
    </div>
  );
}

export default App;

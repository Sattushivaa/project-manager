import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  let [method,setMethod] = useState('Login');
  let [username,setUsername] = useState('');
  let [password,setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/auth/${method === 'Login' ? 'login' : 'register'}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(res => res.json())
      .then(data => {
        if (data.error === false) {
          if (method === 'Login') {
            navigate('/')
          } else {
            alert(data.message);
            setMethod('Login');
            setUsername('');
            setPassword('');
          }
        } else {
          alert(data.message);
        }
      });
  }

  return (
    <>
      <h1>{method}</h1>
      <form onSubmit={handleSubmit}>
        <input name='username' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input name='password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{method}</button>
        <button type="button" onClick={() => setMethod(method === 'Login' ? 'Register' : 'Login')}>
          {method === 'Login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </>
  )
}

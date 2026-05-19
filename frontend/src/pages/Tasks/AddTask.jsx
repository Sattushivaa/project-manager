import React, { useState } from 'react'

export default function AddTask({ projectId, onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status })
      })
      if (res.ok) {
        setTitle('')
        setDescription('')
        setStatus('todo')
        if (typeof onAdd === 'function') return onAdd()
        window.location.reload()
      } else {
        console.error('Failed to create task')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
      <br />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <br />
      <label>
        Status:
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  )
}

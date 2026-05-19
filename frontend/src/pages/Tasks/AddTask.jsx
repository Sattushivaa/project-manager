import React, { useState } from 'react'
import './AddTask.css'

export default function AddTask({ projectId, onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('todo')
  let [assignedTo, setAssignedTo] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status, assignedTo })
      })
      if (res.ok) {
        setTitle('')
        setDescription('')
        setStatus('todo')
        setAssignedTo('')
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
      <div className='newTaskInputs'>
      <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      </div>
      <br />
      <div className='newTaskRibbon'>
<div>
      <label>
        Status:
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
      </label>

      <input type="text" style={{ margin : "0 8px"}} placeholder='assigned to' value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />
</div>
      <button type="submit">Add Task</button>
      </div>
    </form>
  )
}

import React, { useState } from 'react'
import './TaskCard.css'

export default function TaskCard(props) {
  const { task } = props
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState(task.status || 'todo')

  const refresh = () => {
    if (typeof props.onChange === 'function') return props.onChange()
    window.location.reload()
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status })
      })
      if (res.ok) {
        setIsEditing(false)
        refresh()
      } else {
        console.error('Failed to update task')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return
    try {
      const res = await fetch(`/api/tasks/${task._id}`, { method: 'DELETE', credentials: 'include' })
      if (res.ok) refresh()
      else console.error('Failed to delete')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='taskCard'>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div>
            <strong>Status:</strong> {task.status || 'todo'}
          </div>
          <div className='taskCardActions'>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import TaskCard from '../../components/taskCard/TaskCard.jsx'
import AddTask from './AddTask.jsx'
import './Tasks.css'

export default function Tasks() {
    const projectId = window.location.pathname.split("/").pop()
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, { credentials: 'include' })
      if (!res.ok) return console.error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!projectId) return
    fetchTasks()
  }, [projectId])

  const filtered = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === 'all' ? true : (t.status === filterStatus)
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <h2>Tasks</h2>
      <AddTask projectId={projectId} onAdd={fetchTasks} />

      <div className='taskboxActions'>
        <input
          placeholder="Search by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>
        <button onClick={fetchTasks} style={{ marginLeft: 8 }}>Refresh</button>
      </div>

      <div className='tasksContainer'>
        {filtered.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filtered.map(task => (
            <TaskCard key={task._id} task={task} onChange={fetchTasks} />
          ))
        )}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectCard(props) {
    const navigate = useNavigate();
    let [count, setCount] = useState(0);

    useEffect(() => {
      fetch('/api/projects/countTasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId: props.project._id })
      })
        .then(response => {
          if (!response.ok) {
            console.error('countTasks failed', response.status);
            return null;
          }
          return response.json();
        })
        .then(data => {
          if (data) setCount(data.count);
        })
        .catch(err => console.error('countTasks error', err));
    }, [props.project._id])
  return (
    <div>
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
      <span>Created At : {props.project.createdAt}</span>
      <span>Tasks : {count}</span>
      <button onClick={()=>navigate("/projects/"+props.project._id)}>Open</button>
    </div>
  )
}

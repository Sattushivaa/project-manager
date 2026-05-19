import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './projectCard.css';

export default function ProjectCard(props) {
    const navigate = useNavigate();
    let [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(props.project.name);
  const [description, setDescription] = useState(props.project.description || '');

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

    let myDate = new Date(props.project.createdAt);
    let formattedDate = myDate.toLocaleDateString(); //+ " " + myDate.toLocaleTimeString();

  return (
    <>
    <div className='projectCard'>
      {isEditing ? (
        <div className='projectEdit'>
          <input value={name} onChange={e => setName(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
      ) : (
        <>
          <h3>{name}</h3>
          <p>{description}</p>
        </>
      )}
      <div className='projectActions'>
        {!isEditing && <button className='editBtn' onClick={() => setIsEditing(true)}>Edit</button>}
        {isEditing && <button className='saveBtn' onClick={async () => {
            try {
                const res = await fetch(`/api/projects/${props.project._id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, description })
                });
                if (!res.ok) throw new Error('Update failed');
                const data = await res.json();
                setIsEditing(false);
            } catch (err) {
                console.error('Project update error', err);
            }
        }}>Save</button>}
        {isEditing && <button className='cancelBtn' onClick={() => {
            setIsEditing(false);
            setName(props.project.name);
            setDescription(props.project.description || '');
        }}>Cancel</button>}
        <button className='deleteBtn' onClick={async () => {
            if (!confirm('Delete this project?')) return;
            try {
                const res = await fetch(`/api/projects/${props.project._id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (!res.ok) throw new Error('Delete failed');
                window.location.reload();
            } catch (err) {
                console.error('Project delete error', err);
            }
        }}>Delete</button>
      </div>
            <button className='openBtn' onClick={()=>navigate("/projects/"+props.project._id)}>Open</button>

    <div className='ProjectLowRibbon'>
      <span>Created At : {formattedDate}</span>
      <span>Tasks : {count}</span>
    </div>
    </div>
    </>
  )
}

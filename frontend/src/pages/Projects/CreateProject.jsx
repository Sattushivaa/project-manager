import React from 'react'
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';

export default function CreateProject() {
    const navigate = useNavigate();

    let [name, setName] = React.useState("");
    let [description, setDescription] = React.useState("");

    function handleSubmit(e) {
        console.log('Submitting CreateProject form with:', { name, description });
        e.preventDefault();
        fetch('/api/projects', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error('CreateProject error:', data.message);
            } else {
                setName("");
                setDescription("");
                navigate('/');
            }
        })
        .catch(error => {
            console.error('CreateProject error:', error);
        });
    }

  return (
    <div className='createProjectContainer'>
    <div>CreateProject</div>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Project Name' value={name} onChange={(e) => setName(e.target.value)} /> 
        <br />
        <textarea placeholder='Project Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button type='submit'>Create Project</button>
    </form>
    </div>
  )
}

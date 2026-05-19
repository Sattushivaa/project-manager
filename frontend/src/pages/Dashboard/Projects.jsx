import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../../components/projectCard/ProjectCard.jsx';

export default function Projects() {
    const navigate = useNavigate();

    let [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/api/checkAuth', { method: 'POST', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.error === true) {
                    return navigate('/login', { replace: true });
                }
            })
            .catch(() => {
                navigate('/login', { replace: true });
            });
        fetch('/api/projects', { credentials: 'include' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Unauthorized')
                }
                return res.json()
            })
            .then(data => {
                setProjects(data.projects || []);
            })
            .catch(() => {
                setProjects([]);
            });
    }, []);
  return (
    <>
    <div>Projects</div>
    <button onClick={() => navigate("/projects/create")}>Create New Project</button>
    {
        projects.length>0?projects.map((project) => {
            return <ProjectCard key={project._id} project={project} />;
        }): <p>No projects found.</p>
    }
    </>
  )
}

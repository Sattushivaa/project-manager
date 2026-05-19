import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Projects from './pages/Dashboard/Projects.jsx'
import Login from './pages/Login/Login.jsx'
import Tasks from './pages/Tasks/Tasks.jsx'
import CreateProject from './pages/Projects/CreateProject.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Project Manager</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects/:projectId" element={<Tasks />} />
            <Route path='/projects/create' element={<CreateProject />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

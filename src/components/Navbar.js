import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {

  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><i className="fa-solid fa-users"></i> {process.env.REACT_APP_TITLE}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {!localStorage.getItem('token')?
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">about</Link>
            </li>
          </ul>
          <form className='d-flex'>
            <Link className='btn btn-primary mx-1' to="/login" role="button"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
            <Link className='btn btn-primary mx-1' to="/signup" role="button"><i className="fa-solid fa-user-plus"></i> Signup</Link>
          </form>
        </>:
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/dashboard"?"active":""}`} to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/accountsetting"?"active":""}`} to="/accountsetting">Account setting</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/changepassword"?"active":""}`} to="/changepassword">Change Password</Link>
            </li>
          </ul>
          <button onClick={handleLogout} className='btn btn-primary'><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
        </>
      }
      
    </div>
  </div>
</nav>
  )
}
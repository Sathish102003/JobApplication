import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">JobApplicationTracker</Link>

      <div className="collapse navbar-collapse d-flex justify-content-between">
        {/* Left side links */}
        <ul className="navbar-nav d-flex flex-row align-items-center gap-4">
          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Job Application</Link>
              </li>
              
              
            </>
          )}
          {!user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>

        {/* Right side logout button */}
        {user && (
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

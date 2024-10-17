import React, { useState } from 'react';
import '../styles/dashboard.css'
import { Link } from 'react-router-dom';

export default function Dashboard () {

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <div className="avatar">JD</div>
          <div>
            <h2 className="user-name">Jane Doe</h2>
            <p className="user-role">Default User</p>
          </div>
        </div>

        {/* Side buttons */}
        <button className="sidebar-button">
          📁 Folders
        </button>
        <button className="sidebar-button">
          ➕ Add Website
        </button>

        <div className="divider" />

        <button className="sidebar-button">Account Settings</button>
        <Link className='react-link' to='/'>
          <button className="sidebar-button">Sign out</button>
        </Link>
        
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Website</h1>
          <button className="close-button">✕</button>
        </div>
      

      {/*PLACEHOLDER */}
        <div className="cards-container">
          {/* Static placeholder cards */}
          <div className="card">
            <h3 className="site-name">Google</h3>
            <div className="password-group">
              <div className="input">************</div>
              <button className="button">Copy Plain Text</button>
              <button className="button">Reveal</button>
            </div>
          </div>

          <div className="card">
            <h3 className="site-name">Github</h3>
            <div className="password-group">
              <div className="input">************</div>
              <button className="button">Copy Plain Text</button>
              <button className="button">Reveal</button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

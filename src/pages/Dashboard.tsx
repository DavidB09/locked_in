import React, { useState } from 'react';
import '../styles/dashboard.css'
import { Link } from 'react-router-dom';
import Search from '../components/SearchBar';
import Websites from '../components/Websites';

export default function Dashboard () {
  const [search, setSearch] = useState<string>("");
  const [websites, setWebsites] = useState<string[]>([]); //Get the list of websites from the db
  
  const searchFilter = (search : string, websites : string[]) => { //filter the display to show any website that matches current search
    if (!search) { return websites; }
    else {return websites.filter((website) => website.toLowerCase().includes(search))}
  }
  const displayCards = searchFilter(search, websites);

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
        🌐 All Websites
        </button>
        <button className="sidebar-button">
          📁 Folders
        </button>
        <button className="sidebar-button">
          ➕ Add Website
        </button>

        <div className="divider" />

        <button className="sidebar-button">Account Settings</button>
        <Link to='/'>
          <button className="sidebar-button">Sign out</button>
        </Link>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <Search setSearch={setSearch}></Search>
        </div>
      

      {/*PLACEHOLDER */}
      <Websites cards={displayCards}/>
        
      </div>
    </div>



  )
}

import React, { useEffect, useState } from 'react';

import { AuthUser } from 'aws-amplify/auth';

import Search from '../components/SearchBar';
import Websites from '../components/Websites';

import '../styles/dashboard.css'

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

const client = generateClient<Schema>();

interface Props {
  user: AuthUser,
  signOut: any,
}

export default function Dashboard ({ user, signOut }: Props) {
  const [search, setSearch] = useState<string>("");
  const [websites, setWebsites] = useState<string[]>([]); //Get the list of websites from the db
  
  const searchFilter = (search : string, websites : string[]) => { //filter the display to show any website that matches current search
    if (!search) { return websites; }
    else {return websites.filter((website) => website.toLowerCase().includes(search))}
  }
  const displayCards = searchFilter(search, websites);

  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  async function fetchFolders() {
    const { data: folders } = await client.models.Folder.list({ authMode: 'userPool' });
    console.log(folders);
    setFolders(folders);
  }

  async function createPassword(sitename) {
    const { errors, data: newPassword } = await client.models.Password.create({
      website: sitename,
      description: sitename, 
      folderId: "General",
    })

    return newPassword;
  }

  // async function changePasswordFolder(sitename, folderId) {
  //   const {data: newFolder } = await client.models.Folder.get(folderId);

  //   await client.models.Password.update({
  //     folderId: folderId,
  //     folder: newFolder?.name,
  //   })
  // }
  
  async function createFolder(folderName) {
    
    const { errors, data: newFolder } = await client.models.Folder.create({
      name: folderName
    })

    return newFolder;
  }
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
        <button className="sidebar-button" onClick={fetchFolders}>
          📁 Folders
        </button>
        <button className="sidebar-button" onClick={createFolder}>
          ➕ Add Folder
        </button>

        <div className="divider" />

        <button className="sidebar-button">Account Settings</button>
        <button className="sidebar-button" onClick={signOut}>Sign out</button>

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

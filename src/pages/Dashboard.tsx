import React, { useEffect, useState } from 'react';

import { AuthUser } from 'aws-amplify/auth';

import Websites from '../components/Websites';
import Folders from '../components/Folders';

import '../styles/dashboard.css'

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import Add from '../components/AddItem';

type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

const client = generateClient<Schema>();

interface Props {
  user: AuthUser,
  signOut: any,
}

export default function Dashboard ({ user, signOut }: Props) {
  // const [search, setSearch] = useState<string>("");
  // const [websites, setWebsites] = useState<string[]>([]); //Get the list of websites from the db
  const [folders, setFolders] = useState<Folder[]>([]);
  const [view, setView] = useState<number>(0)
  const [form, openForm] = useState<boolean>(false)
  // const searchFilter = (search : string, websites : string[]) => { //filter the display to show any website that matches current search
  //   if (!search) { return websites; }
  //   else {return websites.filter((website) => website.toLowerCase().includes(search))}
  // }
  // const displayCards = searchFilter(search, websites);

  const elements = [<Websites list={folders} handleForm={openForm}/>, <Folders list={folders} handleForm={openForm}/> ]
  
  useEffect(() => {
    fetchFolders();
    setView(0);
  }, []);

  //We can pass folders to the Folder component for them to render ACTUAL folders, and parse the folders for website_card details 
  async function fetchFolders() {
    const { data: folders } = await client.models.Folder.list({ authMode: 'userPool' });
    console.log(folders);
    setFolders(folders);
  }

  //Should the newPass be encrypted already or it needs to be when we send it?
  async function createPassword(sitename: string, description: string, newPass: string) {
    const { errors} = await client.models.Password.create({
      website: sitename,
      description: description,
      folderId: "General"
    })

    return errors; //if any, that is, "Was this successful?"
  }

  //Probably can safely delete?
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
        <button className="sidebar-button" onClick={() => setView(0)}>
        🌐 All Websites
        </button>
        <button className="sidebar-button" onClick={() => setView(1)}>
          📁 Folders
        </button>
        {/* CreateFolder should actually be onSubmit on a form/input not onClick */}
        {/* Should move AddFolder/Website to their respective page components: that is, Folders and Websites */}

        <div className="divider" />

        <button className="sidebar-button">Account Settings</button>
        <button className="sidebar-button" onClick={signOut}>Sign out</button>

      </div>
      {elements[view]}
      {form ? <Add handler={openForm}/> : null}
    </div>



  )
}

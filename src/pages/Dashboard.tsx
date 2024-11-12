import React, { useEffect, useState } from 'react';

import { AuthUser } from 'aws-amplify/auth';

import Websites from '../components/Websites';
import Folders from '../components/Folders';

import '../styles/dashboard.css'

import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { CircularProgress } from '@mui/material';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

const client = generateClient<Schema>();

interface Props {
    user: AuthUser,
    signOut: any,
}

enum PageOptions {
    Websites,
    Folders,
    Settings,
}

export default function Dashboard ({ user, signOut }: Props) {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [view, setView] = useState<PageOptions>(PageOptions.Websites);

    const [loadingFolders, setLoadingFolders] = useState<boolean>(false);
    const [loadingPasswords, setLoadingPasswords] = useState<boolean>(false);

    useEffect(() => {
        fetchFolders();
        fetchPasswords();
    }, []);

    //We can pass folders to the Folder component for them to render ACTUAL folders, and parse the folders for website_card details 
    async function fetchFolders() {
        try {
            setLoadingFolders(true);

            client.models.Folder.list({ authMode: 'userPool' }).then(result => {
                const { data: folders } = result; 
                console.log(folders);

                if (folders.length === 0) {
                    client.models.Folder.create({
                        name: "General",
                    }).then(() => fetchFolders());
                } else {
                    setFolders(folders);
                    setLoadingFolders(false);
                }
            })
        } catch (err) {
            /* TODO add user warning */
            console.log("ERROR fetching folders", err);
            setLoadingFolders(false);
        }
    }

    async function fetchPasswords() {
        try {
            setLoadingPasswords(true);

            client.models.Password.list({ authMode: 'userPool' }).then(result => {
                const { data: passwords } = result;
                console.log(passwords);

                setPasswords(passwords);
                setLoadingPasswords(false);
            })
        } catch (err) {
            /* TODO add user warning */
            console.log("ERROR fetching passwords");
            setLoadingPasswords(false);
        }
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
                <button className="sidebar-button" onClick={() => setView(PageOptions.Websites)}>
                    🌐 All Websites
                </button>
                <button className="sidebar-button" onClick={() => setView(PageOptions.Folders)}>
                    📁 Folders
                </button>

                <div className="divider" />

                <button className="sidebar-button">Account Settings</button>
                <button className="sidebar-button" onClick={signOut}>Sign out</button>
            </div>

            {
                (loadingFolders || loadingPasswords) &&
                <div className="main-content">
                    <CircularProgress color='success' /> 
                </div>
            }

            {
                (!loadingFolders && !loadingPasswords) && view === PageOptions.Websites &&
                <Websites 
                    folderList={folders} 
                    passwordList={passwords} 
                    updatePasswords={fetchPasswords}
                />
            }

            {
                (!loadingFolders && !loadingPasswords) && view === PageOptions.Folders &&
                <Folders 
                    folderList={folders} 
                    updateFolders={fetchFolders}
                /> 
            }
        </div>
    )
}

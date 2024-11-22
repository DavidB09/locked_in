import React, { useContext, useEffect, useState } from 'react';

import { fetchUserAttributes, signOut, updateUserAttribute, type FetchUserAttributesOutput } from 'aws-amplify/auth';

import Websites from '../components/Websites';
import Folders from '../components/Folders';
import AccountSettings from '../components/AccountSettings';

import { NotificationContext, NotificationModal, NotificationType } from '../components/NotificationModal';

import '../styles/dashboard.css'
import { CircularProgress } from '@mui/material';

import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];
const client = generateClient<Schema>();

enum PageOptions {
    Websites,
    Folders,
    Settings,
}

export default function Dashboard () {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [view, setView] = useState<PageOptions>(PageOptions.Websites);

    const [loadingFolders, setLoadingFolders] = useState<boolean>(false);
    const [loadingPasswords, setLoadingPasswords] = useState<boolean>(false);

    const [userAttributes, setUserAttributes] = useState<FetchUserAttributesOutput|null>();

    const { setNotification } = useContext(NotificationContext);

    useEffect(() => {
        fetchUserInfo();
        fetchFolders();
        fetchPasswords();
    }, []);

    async function fetchUserInfo() {
        // Load user attributes
        fetchUserAttributes().then(result => {
            setUserAttributes(result);

            // Generate unique phrase
            if (!result["custom:ukey"]) {
                createUserKey();
            }
        }).catch(() => {
            setNotification({
                type: NotificationType.Warning,
                msg: 'User attributes were not loaded, please try again'
            });
        });
    }

    async function createUserKey() {
        client.queries.generateKey({}).then(({data: uKey}) => {
            // Update unique phrase
            updateUserAttribute({
                userAttribute: {
                    attributeKey: "custom:ukey",
                    value: uKey!,
                }
            }).catch(() => {
                // Retry
                createUserKey();
            });
        }).catch(() => {
            // Retry
            createUserKey();
        });
    }

    async function fetchFolders() {
        setLoadingFolders(true);

        // Load folders
        client.models.Folder.list({ authMode: 'userPool' }).then(result => {
            const { data: folders } = result; 

            if (folders.length === 0) {
                // Create a General folder for each user
                client.models.Folder.create({
                    name: "General",
                }).then(() => fetchFolders());
            } else {
                setFolders(folders);
                setLoadingFolders(false);
            }
        }).catch(() => {
            setNotification({
                type: NotificationType.Warning,
                msg: 'Folders were not loaded, please try again'
            });
            setLoadingFolders(false);
        });
    }

    async function fetchPasswords() {
        setLoadingPasswords(true);

        // Load passwords
        client.models.Password.list({ authMode: 'userPool' }).then(result => {
            const { data: passwords } = result;

            // Decrypt the passwords
            decryptAllPasswords(passwords);
        }).catch(() => {
            setNotification({
                type: NotificationType.Warning,
                msg: 'Passwords were not loaded, please try again'
            });
            setLoadingPasswords(false);
        });
    }

    function decryptAllPasswords(passwordList: Password[]) {
        Promise.all(passwordList
            .map(async (entity) => {
                const { data: decryptP } = await fetchUserAttributes().then(result => {
                    if (!result["custom:ukey"]) {
                        throw new Error("No user key");
                    } else {
                        // Decrypt the password using the unique phrase
                        return client.queries.decrypt({
                            hash: entity.hash, 
                            phrase: result["custom:ukey"]
                        });
                    }
                });

                // Return decrypted password
                return {
                    ...entity,
                    hash: decryptP,
                } as Password
            })).then(result => {
                setPasswords(result);
                setLoadingPasswords(false);
            }).catch(() => {
                setNotification({
                    type: NotificationType.Warning,
                    msg: 'Passwords were not loaded, please try again'
                });
                setLoadingPasswords(false);
            });
    }

    return (
        <div className="container">
            <div className="sidebar">
                <div className="profile-section">
                    <div className="avatar">
                        {userAttributes?.preferred_username?.at(0) || userAttributes?.email?.at(0) || ''}
                    </div>
                    <div>
                        <h2 className="user-name">
                            {userAttributes?.preferred_username || userAttributes?.email || ''}
                        </h2>
                    </div>
                </div>

                <button className="sidebar-button" onClick={() => setView(PageOptions.Websites)}>
                    🌐 All Websites
                </button>
                <button className="sidebar-button" onClick={() => setView(PageOptions.Folders)}>
                    📁 Folders
                </button>

                <div className="divider" />

                <button className="sidebar-button" onClick={() => setView(PageOptions.Settings)}>
                    Account Settings
                </button>
                <button 
                    className="sidebar-button" 
                    onClick={async () => await signOut({ global: true })}
                >
                    Sign Out
                </button>
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
                    passwordList={passwords}
                    updatePasswords={fetchPasswords}
                    updateFolders={fetchFolders}
                /> 
            }
            {
                view === PageOptions.Settings &&
                <AccountSettings 
                    currUsername={userAttributes?.preferred_username}
                    handleUpdate={fetchUserInfo}
                />
            }

            <NotificationModal />
        </div>
    )
}

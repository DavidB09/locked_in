import React, { useContext, useEffect, useState } from 'react';

import { 
    updatePassword, 
    updateUserAttributes, 
} from 'aws-amplify/auth';

import { Button, CircularProgress, TextField } from '@mui/material';

import { NotificationContext, NotificationType } from '../components/NotificationModal';

interface Props {
    currUsername?: string,
    handleUpdate: () => void,
}

export default function AccountSettings({currUsername, handleUpdate}: Props) {
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [currPassword, setCurrPassword] = useState<string>("");
    const [currPasswordError, setCurrPasswordError] = useState<boolean>(false);
    const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [loadingUsername, setLoadingUsername] = useState<boolean>(false);

    const { setNotification } = useContext(NotificationContext);

    useEffect(() => {
        setUsername(currUsername || "");
    }, [currUsername]);

    async function handlePasswordSubmit() {
        if (!currPassword.length) {
            setCurrPasswordError(true);
        }

        if (!newPassword.length) {
            setNewPasswordError(true);
        }

        if (currPassword.length && newPassword.length) {
            setLoadingPassword(true);
            updatePassword({
                oldPassword: currPassword,
                newPassword: newPassword,
            }).then(() => {
                setLoadingPassword(false);
                setCurrPassword("");
                setNewPassword("");
                setNotification({
                    type: NotificationType.Success,
                    msg: 'New password was saved!'
                });
            }).catch(() => {
                setNotification({
                    type: NotificationType.Warning,
                    msg: 'Error updating password, please make sure you match your current password'
                });
                setLoadingPassword(false);
            });
        }
    }

    async function handleUsernameSubmit() {
        setLoadingUsername(true);

        updateUserAttributes({
            userAttributes: {
                preferred_username: username
            }
        }).then(() => {
            setLoadingUsername(false);
            handleUpdate();
            setNotification({
                type: NotificationType.Success,
                msg: 'Username was updated!'
            });
        }).catch(() => {
            setNotification({
                type: NotificationType.Warning,
                msg: 'Username failed to update, please try again'
            });
            setLoadingUsername(false);
        });
    }

    return (
        <div className="main-content">
            <div className="header">
                <h2>Account Settings</h2>
            </div>

            <div className="cards-container">
                <div>
                    <TextField
                        id="currpassword-input"
                        label="Current Password"
                        helperText="Must equal current password"
                        error={currPasswordError}
                        required
                        onChange={(e) => {
                            setCurrPassword(e.target.value)
                            setCurrPasswordError(false);
                        }}
                        sx={{bgcolor: "#f6f6f6"}}
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        helperText="Requires input"
                        error={newPasswordError}
                        required
                        onChange={(e) => {
                            setNewPassword(e.target.value)
                            setNewPasswordError(false);
                        }}
                        sx={{bgcolor: "#f6f6f6"}}
                    />

                    <Button
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handlePasswordSubmit()}
                        disabled={loadingPassword}
                        sx={{bgcolor: "#f6f6f6", color: "#000"}}
                    >
                        {loadingPassword ? <CircularProgress /> : 'Submit' }
                    </Button>
                </div>

                <div>
                    <TextField
                        id="username-input"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{bgcolor: "#f6f6f6"}}
                    />

                    <Button
                        variant="contained" 
                        color="secondary" 
                        onClick={() => handleUsernameSubmit()}
                        disabled={loadingUsername}
                        sx={{bgcolor: "#f6f6f6", color: "#000"}}
                    >
                        {loadingUsername ? <CircularProgress /> : 'Submit' }
                    </Button>
                </div>
            </div>
        </div>
    )
}
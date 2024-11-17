import React, { useContext, useEffect, useState } from 'react';

import { 
    updatePassword, 
    updateUserAttributes, 
} from 'aws-amplify/auth';

import { Box, Button, CircularProgress, FormHelperText, IconButton, InputAdornment, Paper, TextField } from '@mui/material';

import { NotificationContext, NotificationType } from '../components/NotificationModal';
import { VisibilityOff, Visibility } from '@mui/icons-material';

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
    const [reveal, setVisibility] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [loadingUsername, setLoadingUsername] = useState<boolean>(false);

    const { setNotification } = useContext(NotificationContext);
    const handleVisibility = () => {
        setVisibility((reveal) => !reveal)
    }


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
                <Paper sx={{ height: "50vh", width: "100%", padding: "10px"}}>
                    <Box margin={"2vh 0"}>
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
                            sx={{marginLeft: "10px", marginTop: "10px"}}
                        
                        >
                            {loadingUsername ? <CircularProgress /> : 'Submit' }
                        </Button>

                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"} flexDirection={"column"} gap={1}>
                    <TextField
                            id="currpassword-input"
                            label="Current Password"                            
                            error={currPasswordError}
                            type={reveal ? "text" : "password"}
                            required
                            onChange={(e) => {
                                setCurrPassword(e.target.value)
                                setCurrPasswordError(false);
                            }}
                            sx={{bgcolor: "#f6f6f6", maxWidth: "50%"}}
                            slotProps={{
                                input: {
                                  endAdornment: 
                                  <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleVisibility}
                                
                                  >
                                    {reveal ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                  </InputAdornment>,   
                                }}}
                        />
                        <TextField
                            id="password-input"
                            label="New Password"
                            type={reveal ? "text" : "password"}
                            helperText="Requires input"
                            error={newPasswordError}
                            required
                            onChange={(e) => {
                                setNewPassword(e.target.value)
                                setNewPasswordError(false);
                            }}
                            slotProps={{
                                input: {
                                  endAdornment: 
                                  <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleVisibility}
                                
                                  >
                                    {reveal ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                  </InputAdornment>,   
                                }}}
                            sx={{bgcolor: "#f6f6f6", maxWidth: "50%"}}
                        />
                    </Box>
                                            <Button
                            variant="contained" 
                            color="secondary" 
                            onClick={() => handlePasswordSubmit()}
                            disabled={loadingPassword}
                            sx={{margin: "15px 0"}}
                        >
                            {loadingPassword ? <CircularProgress /> : 'Submit' }
                        </Button>
                    
                </Paper>
            </div>
        </div>
    )
}
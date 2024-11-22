import React, { useContext, useEffect, useState } from "react";

import { 
    Box, 
    Button, 
    CircularProgress, 
    IconButton, 
    InputAdornment, 
    MenuItem, 
    Modal, 
    TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { NotificationContext, NotificationType } from '../components/NotificationModal';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { fetchUserAttributes } from "aws-amplify/auth";
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

const client = generateClient<Schema>();

interface addProps {
    showModal: boolean,
    folders: Folder[],
    initFolder: string,
    currPassword?: Password
    handleClose: (update?: boolean) => void,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3
};

export default function PasswordForm({ showModal, handleClose, folders, initFolder, currPassword }: addProps) {
    const [website, setWebsite] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [folder, setFolder] = useState<string>("");
    const [folderOptions, setFolderOptions] = useState<Folder[]>([]);
    const [reveal, setVisibility] = useState<boolean>(false);

    const [websiteError, setWebsiteError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [folderError, setFolderError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const handleVisibility = () => {
        setVisibility((reveal) => !reveal)
    }

    const { setNotification } = useContext(NotificationContext);

    useEffect(() => {
        setFolderOptions(folders);
        setVisibility(false)

        // Update the current password
        if (currPassword) {
            setWebsite(currPassword.website!);
            setUsername(currPassword.username!);
            setPassword(currPassword.hash!);
            setDescription(currPassword.description!);
            setFolder(currPassword.folderId!);
        } else {
            setFolder(initFolder);
        }
    }, [currPassword, initFolder, folders]);

    async function handleSubmit() {
        if (!website.length) {
            setWebsiteError(true);
        }

        if (!username.length) {
            setUsernameError(true);
        }

        if (!password.length) {
            setPasswordError(true);
        }

        if (!folder?.length) {
            setFolderError(true);
        }

        if (website.length && username.length && password.length && folder?.length) {
            setLoading(true);

            fetchUserAttributes().then(result => {
                if (!result["custom:ukey"]) {
                    throw new Error("No user key");
                } else {
                    // Encrypt the password using the unique phrase
                    client.queries.encrypt({ 
                        password: password, 
                        phrase: result["custom:ukey"]
                    }).then(({ data: newPass }) => {

                        // Check if update
                        if (currPassword) {
                            client.models.Password.update({
                                id: currPassword.id,
                                website: website,
                                hash: newPass,
                                description: description,
                                username: username,
                                folderId: folder
                            }).then(() => {
                                handleClose(true);
                                setLoading(false);
                                setWebsite("");
                                setUsername("");
                                setPassword("");
                                setDescription("");
                                setFolder(folderOptions.find(f => f.name === 'General')?.id!);
                                setNotification({
                                    type: NotificationType.Success,
                                    msg: 'Password was saved!'
                                });
                            }).catch(() => {
                                setNotification({
                                    type: NotificationType.Warning,
                                    msg: 'Password was not saved, please try again'
                                });
                                setLoading(false);
                            });
                        } else {
                            // Create a new password
                            client.models.Password.create({
                                website: website,
                                hash: newPass,
                                description: description,
                                username: username,
                                folderId: folder
                            }).then(() => {
                                handleClose(true);
                                setLoading(false);
                                setWebsite("");
                                setUsername("");
                                setPassword("");
                                setDescription("");
                                setFolder(folderOptions.find(f => f.name === 'General')?.id!);
                                setNotification({
                                    type: NotificationType.Success,
                                    msg: 'Password was saved!'
                                });
                            }).catch(() => {
                                setNotification({
                                    type: NotificationType.Warning,
                                    msg: 'Password was not saved, please try again'
                                });
                                setLoading(false);
                            });
                        }
                    }).catch(() => {
                        setNotification({
                            type: NotificationType.Warning,
                            msg: 'Password was not saved, please try again'
                        });
                    });
                }
            }).catch(() => {
                setNotification({
                    type: NotificationType.Warning,
                    msg: 'Password was not saved, please try again'
                });
            });
        }
    }

    return (
        <Modal 
            open={showModal}
            onClose={() => {
                handleClose();
                setWebsite("");
                setUsername("");
                setPassword("");
                setDescription("");
                setFolder(folderOptions.find(f => f.name === 'General')?.id!);
                setWebsiteError(false);
                setUsernameError(false);
                setPasswordError(false);
                setFolderError(false);
            }}
            aria-labelledby="modal-modal-password"
            aria-describedby="modal-modal-password-form"
        >
            <Box sx={style}>
                <Box sx={{margin: "10px", display: "flex", justifyContent: "space-between"}}>
                    <TextField
                        id="website-input"
                        label="Website"
                        error={websiteError}
                        required
                        value={website}
                        onChange={(e) => {
                            setWebsite(e.target.value)
                            setWebsiteError(false);
                        }}
                        
                    />

                    <TextField
                        id="folder-input"
                        label="Folder"
                        error={folderError}
                        value={folder ?? initFolder}
                        onChange={(e) => {
                            setFolder(e.target.value);
                            setFolderError(false);
                        }}
                        select
                        required
                        
                    >
                        {folderOptions.map((folder) => (
                            <MenuItem key={folder.id} value={folder.id!}>
                                {folder.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <TextField
                    id="username-input"
                    label="Username"
                    error={usernameError}
                    required
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError(false);
                    }}
                    sx={{margin: "10px", display: "block"}}
                />

                <TextField
                    id="password-input"
                    label="Password"
                    type= {reveal ? "text" : "password"}
                    error={passwordError}
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
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
                      
                    sx={{margin: "10px", display: "block"}}
                />
                
                <TextField
                    id="description-input"
                    label="Description"
                    value={description}
                    multiline
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{margin: "10px", display: "block"}}
                />

                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleSubmit()}
                    disabled={loading}
                    sx={{margin: "10px", display: "block"}}
                >
                    {loading ? <CircularProgress /> : 'Submit' }
                </Button>
            </Box>
        </Modal>
    )
}
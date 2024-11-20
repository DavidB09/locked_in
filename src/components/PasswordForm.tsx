import React, { useContext, useState } from "react";

import { 
    Box, 
    Button, 
    CircularProgress, 
    MenuItem, 
    Modal, 
    TextField
} from "@mui/material";

import { NotificationContext, NotificationType } from '../components/NotificationModal';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

const client = generateClient<Schema>();

interface addProps {
    showModal: boolean,
    handleClose: (update?: boolean) => void,
    folderOptions: Folder[],
    initFolder: string,
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
    p: 4,
};

export default function PasswordForm({showModal, handleClose, folderOptions, initFolder}: addProps) {
    const [website, setWebsite] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [folder, setFolder] = useState<string|null>(initFolder);

    const [websiteError, setWebsiteError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const { setNotification } = useContext(NotificationContext);

    async function handleSubmit() {
        console.log(website, password, description, folder);
        if (!website.length) {
            setWebsiteError(true);
        }

        if (!username.length) {
            setUsernameError(true);
        }

        if (!password.length) {
            setPasswordError(true);
        }

        if (website.length && username.length && password.length && folder) {
            /* TODO ENCRYPT PASSWORD BEFORE CREATING */
            try {

                var newPass = (await client.queries.encrypt({ password: password }).toString());
                setLoading(true);
                client.models.Password.create({
                    website: website,
                    hash: newPass,
                    description: description,
                    username: username,
                    folderId: folderOptions.find(f => f.name === folder)?.id
                }).then(() => {
                    handleClose(true);
                    setLoading(false);
                    setWebsite("");
                    setUsername("");
                    setPassword("");
                    setDescription("");
                    setFolder(initFolder);
                    setNotification({
                        type: NotificationType.Success,
                        msg: 'Password was saved!'
                    });

                    console.log(password);
                });
            } catch (err) {
                setNotification({
                    type: NotificationType.Warning,
                    msg: 'Password was not saved, please try again'
                });
                setLoading(false);
            }
        }
    }

    return (
        <Modal 
            open={showModal}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-password"
            aria-describedby="modal-modal-password-form"
        >
            <Box sx={style}>
                <TextField
                    id="website-input"
                    label="Website"
                    helperText="Requires input"
                    error={websiteError}
                    required
                    onChange={(e) => {
                        setWebsite(e.target.value)
                        setWebsiteError(false);
                    }}
                />

                <TextField
                    id="username-input"
                    label="Username"
                    helperText="Requires input"
                    error={usernameError}
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setUsernameError(false);
                    }}
                />

                <TextField
                    id="password-input"
                    label="Password"
                    helperText="Requires input"
                    error={passwordError}
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                    }}
                />

                <TextField
                    id="description-input"
                    label="Description"
                    multiline
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    id="folder-input"
                    label="Folder"
                    helperText="Requires input"
                    error={!folder}
                    onChange={(e) => setFolder(e.target.value)}
                    select
                    required
                    defaultValue={initFolder}
                >
                    {folderOptions.map((folder) => (
                        <MenuItem key={folder.id} value={folder.name!}>
                            {folder.name}
                        </MenuItem>
                    ))}
                </TextField>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleSubmit()}
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> : 'Submit' }
                </Button>
            </Box>
        </Modal>
    )
}
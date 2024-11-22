import React, { useContext, useEffect, useState } from "react";

import { 
    Box, 
    Button, 
    CircularProgress, 
    Modal, 
    TextField
} from "@mui/material";
import { Folder } from "@mui/icons-material";

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

import { NotificationContext, NotificationType } from '../components/NotificationModal';

const client = generateClient<Schema>();
type Folder = Schema['Folder']['type'];

interface addProps {
    showModal: boolean,
    currFolder?: Folder,
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
    p: 4,
    display: "flex",
    justifyContent: "space-evenly"
};

export default function FolderForm({showModal, currFolder, handleClose}: addProps) {
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { setNotification } = useContext(NotificationContext);

    useEffect(() => {
        if (currFolder) setName(currFolder.name!)
    }, [currFolder])

    async function handleSubmit() {
        if (!name.length) {
            setNameError(true);
        } else if (name === "General") {
            setNameError(true);
            setNotification({
                type: NotificationType.Warning,
                msg: 'General folder cannot be changed/duplicated!'
            });
        } else {
            setLoading(true);

            // Check if update
            if (currFolder) {
                client.models.Folder.update({
                    id: currFolder.id,
                    name: name,
                }).then(() => {
                    handleClose(true);
                    setLoading(false);
                    setName("");
                    
                    setNotification({
                        type: NotificationType.Success,
                        msg: 'Folder was saved!'
                    });
                }).catch(() => {
                    setNotification({
                        type: NotificationType.Warning,
                        msg: 'Folder was not saved, please try again'
                    });
                    setLoading(false);
                });
            } else {
                // Create new folder
                client.models.Folder.create({
                    name: name
                }).then(() => {
                    handleClose(true);
                    setLoading(false);
                    setName("");
                    
                    setNotification({
                        type: NotificationType.Success,
                        msg: 'Folder was saved!'
                    });
                }).catch(() => {
                    setNotification({
                        type: NotificationType.Warning,
                        msg: 'Folder was not saved, please try again'
                    });
                    setLoading(false);
                })
            }
        }
    }

    return (
        <Modal 
            open={showModal}
            onClose={() => {
                handleClose();
                setName("");
                setNameError(false);
            }}
            aria-labelledby="modal-modal-folder"
            aria-describedby="modal-modal-folder-form"
        >
            <Box sx={style}>
                <TextField
                    id="name-input"
                    label="Name"
                    error={nameError}
                    required
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setNameError(false);
                    }}
                    
                />

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
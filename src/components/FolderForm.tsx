import React, { useState } from "react";

import { 
    Box, 
    Button, 
    CircularProgress, 
    Modal, 
    TextField
} from "@mui/material";

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface addProps {
    showModal: boolean,
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
};

export default function FolderForm({showModal, handleClose}: addProps) {
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit() {
        console.log(name);
        if (!name.length) {
            setNameError(true);
        } else {
            try {
                setLoading(true);
                client.models.Folder.create({
                    name: name
                }).then(() => {
                    handleClose(true);
                    setLoading(false);
                });
            } catch (err) {
                /* TODO WARN USER */
                console.log("ERROR saving folder");
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
                    id="name-input"
                    label="Name"
                    helperText="Requires input"
                    error={nameError}
                    required
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
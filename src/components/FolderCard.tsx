import React, { Dispatch, SetStateAction, useContext, useState } from "react";

import { Box, IconButton, Button, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import FolderIcon from '../assets/folder.png'

import { NotificationContext, NotificationType } from '../components/NotificationModal';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];

const client = generateClient<Schema>();

interface cardProps {
    folder: Folder,
    updateFolders: () => void
    showDeleteFolder: Dispatch<SetStateAction<boolean>>
    handleOpenFolder: (folder : Folder) => void
    setCurrentFolder: (folder: Folder) => void
}

export default function FolderCard ({
    folder, updateFolders, handleOpenFolder, setCurrentFolder, showDeleteFolder
} : cardProps){
    const [edit, setEdit] = useState<boolean>(false);
    const [foldername, setName] = useState<string>("");
    const { setNotification } = useContext(NotificationContext);
    const [currFolder, setCurrFolder] = useState<Folder|undefined>();
    
    function handleFolderFormSubmit(update?: boolean) {
        if (update) {
            updateFolders();
        }
        setCurrFolder(undefined);
    }

    async function handleFolderChange(){
        if (!foldername.length) {
        } else {
            // Update the current folder name
            if (currFolder) {
                client.models.Folder.update({
                    id: currFolder.id,
                    name: foldername,
                }).then(() => {
                    setName("");
                    handleFolderFormSubmit(true)
                    setEdit(false)
                    
                    setNotification({
                        type: NotificationType.Success,
                        msg: 'Folder was saved!'
                    });
                }).catch(() => {
                    setNotification({
                        type: NotificationType.Warning,
                        msg: 'Folder was not saved, please try again'
                    });
                });
            } 
        }
    }

    return (
        <Box key={folder.id} sx={{ cursor: 'pointer', width:"25vh", height: "30vh"}}>
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                <IconButton 
                    sx={{bgcolor: "#153042", top: "30px", position: "relative"}}
                    onClick={() => {
                        setCurrentFolder(folder);
                        showDeleteFolder(true);
                    }}
                >
                    <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                </IconButton>
            </Box>
            <Box sx={{display: "flex", flexDirection: 'column', justifyContent: "center"}}>
                <Box sx={{display: "flex", justifyContent: "center"}}
                    onClick={() => {
                        handleOpenFolder(folder);
                    }}
                >
                    <img 
                        src={FolderIcon}
                        style={{ height:"20vh", width:"20vh", objectFit: "contain", margin: "auto" }} 
                    />
                </Box>
                <Button onClick={() => setEdit(true)}>
                    {edit ? 
                        <TextField 
                            variant="standard"
                            size="small"
                            margin="dense"
                            placeholder={folder.name || undefined}
                            onBlur={() => {
                                handleFolderChange()   
                            }}
                            onChange={(e) => {
                                setCurrFolder(folder)
                                setName(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if(e.key == "Enter")
                                    handleFolderChange()                                                                    

                            }}
                            sx={{input: {color: "white", textAlign: "center"}}}
                        />
                    :
                        <Typography 
                            variant="h6" 
                            display={"block"} 
                            textAlign={"center"} 
                            textTransform={"none"} 
                            color="white"
                        >
                            {folder.name}
                        </Typography>
                    }
                </Button>
            </Box>
        </Box>
    )
}
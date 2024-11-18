import { Box, IconButton, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FolderIcon from '../assets/folder.png'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { NotificationContext, NotificationType } from '../components/NotificationModal';

type Folder = Schema['Folder']['type'];

const client = generateClient<Schema>();

interface cardProps {
    folder: Folder,
    updateFolders: () => void
    handleOpenFolder: (folder : Folder) => void
}

export default function FolderCard ({folder, updateFolders, handleOpenFolder} : cardProps){
    const [edit, setEdit] = useState<boolean>(false);
    const [foldername, setName] = useState<string>("");
    const { setNotification } = useContext(NotificationContext);
    const [nameError, setNameError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currFolder, setCurrFolder] = useState<Folder|undefined>();
    
    function handleFolderFormSubmit(update?: boolean) {
        if (update) {
            updateFolders();
        }
        setCurrFolder(undefined);
    }

    async function handleFolderChange(){
        if (!foldername.length) {
            setNameError(true);
            
        } else {
            setLoading(true);

            if (currFolder) {
                client.models.Folder.update({
                    id: currFolder.id,
                    name: foldername,
                }).then(() => {
                    setLoading(false);
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
                                        <Box sx={{display: "flex", justifyContent: "center", gap: "5px"}}>
                                            <IconButton
                                                sx={{bgcolor: "#153042"}}
                                                onClick={() => {
                                                    setCurrFolder(folder);
                                                }}
                                            >
                                                <CreateIcon fontSize='small' sx={{color: "white"}}/>
                                            </IconButton>
                                            <IconButton 
                                                sx={{bgcolor: "#153042"}}
                                                onClick={() => {
                                                    setCurrFolder(folder);
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
                                                style={{height:"20vh", width:"20vh", objectFit: "contain", margin: "auto"}} 
                                            />
                                        </Box>

                                            <Button onClick={() => setEdit(true)}>
                                                {edit ? 
                                                <TextField variant="standard"
                                                size="small"
                                                margin="dense"
                                                placeholder={folder.name || undefined}
                                                onBlur={() => {
                                                    setCurrFolder(folder)
                                                    handleFolderChange   
                                                    
                                                }}
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                }}
                                                onKeyDown={(e) => {
                                                    if(e.key == "Enter")
                                                        setCurrFolder(folder)
                                                        handleFolderChange                                                                    

                                                }}
                                                sx={{input: {color: "white", textAlign: "center"}}}
                                                >    
                                                </TextField>
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
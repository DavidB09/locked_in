import React, { useEffect, useState } from "react";

import {
    Box,
    IconButton,
    Paper, 
    Grid2,
    Typography,
    Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
//import FolderIcon from '../assets/folder.png'

import Card from './Cards';

import type { Schema } from '../../amplify/data/resource';
import PasswordForm from './PasswordForm';
import FolderForm from "./FolderForm";
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface Props {
    folderList: Folder[],
    updateFolders: () => void,
}

export default function Folders({folderList, updateFolders} : Props){
    const [folders, setFolders] = useState<Folder[]>([]);
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [showFolderForm, setShowFolderForm] = useState<boolean>(false);


    const [folderOpen, setOpen] = useState<boolean>(false)
    const [folderWebsites, setFolder] = useState<Folder[]>([])

    const handleOpenFolder = ((label) => {
        setOpen(true)
        //Set folderwebsites to all all websites within that folder
    })

    useEffect(() => {
        setOpen(false);
        setFolders(folderList);
    }, [folderList]);

    function handleFolderFormSubmit(update?: boolean) {
        if (update) {
            updateFolders();
        }
        setShowFolderForm(false);
    }

    return (
        <div className="main-content">
            {
                folderOpen ?
                <>
                    <Box
                        width={"40vw"} 
                        height={"5vh"} 
                        justifyContent={"right"} 
                        display={"flex"} 
                        margin={"5vh 0 10px 0"} 
                        columnGap={"1vw"}
                    >
                        <IconButton onClick={() => setOpen(false)} sx={{bgcolor: "#153042", margin: "0 auto"}}>
                            <ArrowLeftIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton sx={{bgcolor: "#153042"}}>
                            <AddIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton sx={{bgcolor: "#153042"}}>
                            <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                    {/* //Map folderwebsites and generate respective card */}
                    <div className="cards-container">
                        <Card name={"test"} pwd={"awliwoqweoqowi3"}/>    
                    </div>
                </>
                :
                <>
                    <Box
                        width={"40vw"} 
                        height={"5vh"} 
                        justifyContent={"right"}  
                        display={"flex"} 
                        margin={"5vh 0 10px 0"} 
                        columnGap={"1vw"}
                    >
                        <IconButton onClick={() => setShowFolderForm(true)} sx={{bgcolor: "#153042"}}>
                            <AddIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton sx={{bgcolor: "#153042"}}>
                            <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                    <Grid2 container spacing={2} margin={"0 10%"}>
                        {
                            folders.map(folder => (
                                <Button key={folder.id} onClick={handleOpenFolder}>
                                    <Paper elevation={5} sx={{width:"25vh", height: "25vh", bgcolor: "#21435A"}}>
                                        <Box sx={{display: "flex", justifyContent: "center"}}>
                                        {/*<img src={FolderIcon}
                                        style={{height:"20vh", width:"20vh", objectFit: "contain"}}></img>*/}
                                        </Box>
                                        <Typography 
                                            variant="h6" 
                                            display={"block"} 
                                            textAlign={"center"} 
                                            textTransform={"none"} 
                                            color="white"
                                        >
                                            {folder.name}
                                        </Typography>
                                    </Paper> 
                                </Button>
                            ))
                        }
                    </Grid2>
                </> 
            }

            <FolderForm
                showModal={showFolderForm} 
                handleClose={handleFolderFormSubmit}
            />
        </div>
    )
}
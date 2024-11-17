import React, { useEffect, useState } from "react";

import {
    Box,
    IconButton,
    Paper, 
    Grid2,
    Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import FolderIcon from '../assets/folder.png'
import Card from './Cards';
import PasswordForm from './PasswordForm';
import FolderForm from "./FolderForm";

import type { Schema } from '../../amplify/data/resource';
import DeleteForm from "./DeleteForm";
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface Props {
    folderList: Folder[],
    passwordList: Password[],
    updateFolders: () => void,
    updatePasswords: () => void,
}

export default function Folders({folderList, passwordList, updateFolders, updatePasswords} : Props){
    const [folders, setFolders] = useState<Folder[]>([]);
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [folderOpen, setFolderOpen] = useState<boolean>(false)

    const [currFolder, setCurrFolder] = useState<Folder|undefined>();
    const [folderPasswords, setFolderPasswords] = useState<Password[]>([]);

    const [showFolderForm, setShowFolderForm] = useState<boolean>(false);
    const [showDeleteFolder, setShowDeleteFolder] = useState<boolean>(false);

    const [currPassword, setCurrPassword] = useState<Password|undefined>();
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
    const [showDeletePassword, setShowDeletePassword] = useState<boolean>(false);

    useEffect(() => {
        setFolders(folderList);
        setPasswords(passwordList);
    }, [folderList, passwordList]);

    function handleOpenFolder(folder: Folder) {
        setFolderOpen(true);
        setCurrFolder(folder);
        setFolderPasswords(passwords.filter(p => p.folderId === folder.id));
    }

    function handleCloseFolder() {
        setFolderOpen(false);
        setCurrFolder(undefined);
        setFolderPasswords([]);
    }

    function handleFolderFormSubmit(update?: boolean) {
        if (update) {
            updateFolders();
        }
        setShowFolderForm(false);
        setCurrFolder(undefined);
    }

    function handleDeleteFolderSubmit(update?: boolean) {
        if (update) {
            updateFolders();
            updatePasswords();
        }
        setShowDeleteFolder(false);
        setCurrFolder(undefined);
    }

    function handlePasswordFormSubmit(update?: boolean) {
        if (update) {
            handleCloseFolder();
            updatePasswords();
        }
        setShowPasswordForm(false);
        setCurrPassword(undefined);
    }

    function handleDeletePasswordSubmit(update?: boolean) {
        if (update) {
            handleCloseFolder();
            updatePasswords();
        }
        setShowDeletePassword(false);
        setCurrPassword(undefined);
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
                        <IconButton onClick={handleCloseFolder} sx={{bgcolor: "#153042", margin: "0 auto"}}>
                            <ArrowLeftIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton sx={{bgcolor: "#153042"}} onClick={() => setShowPasswordForm(true)}>
                            <AddIcon fontSize='small' sx={{color: "white"}}/>
                        </IconButton>
                    </Box>
                    <div className="cards-container">
                        {
                            folderPasswords.length ? 
                                folderPasswords.map((password) => (
                                    <Card 
                                        key={password.id} 
                                        name={password.website!}
                                        username={password.username!}
                                        pwd={password.hash!}
                                        description={password.description!}
                                        folder={currFolder?.name!}
                                        selectUpdate={() => {
                                            setCurrPassword(password);
                                            setShowPasswordForm(true);
                                        }}
                                        selectDelete={() => {
                                            setCurrPassword(password);
                                            setShowDeletePassword(true);
                                        }}
                                    />
                                ))
                                : <p>No websites found</p>
                        }
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
                    </Box>
                    <Grid2 container spacing={2} margin={"0 10%"}>
                        {
                            folders.map(folder => (
                                <Box key={folder.id} sx={{ cursor: 'pointer' }}>
                                    <Paper elevation={5} sx={{width:"25vh", height: "30vh", bgcolor: "#21435A"}}>
                                        <Box sx={{display: "flex", justifyContent: "center", gap: "5px"}}>
                                            <IconButton
                                                sx={{bgcolor: "#153042"}}
                                                onClick={() => {
                                                    setCurrFolder(folder);
                                                    setShowFolderForm(true);
                                                }}
                                            >
                                                <CreateIcon fontSize='small' sx={{color: "white"}}/>
                                            </IconButton>
                                            <IconButton 
                                                sx={{bgcolor: "#153042"}}
                                                onClick={() => {
                                                    setCurrFolder(folder);
                                                    setShowDeleteFolder(true);
                                                }}
                                            >
                                                <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                                            </IconButton>
                                        </Box>
                                        <Box 
                                            sx={{display: "flex", flexDirection: 'column', justifyContent: "center"}}
                                            onClick={() => {
                                                handleOpenFolder(folder);
                                            }}
                                        >
                                            <img 
                                                src={FolderIcon}
                                                style={{height:"20vh", width:"20vh", objectFit: "contain", margin: "auto"}} 
                                            />
                                            <Typography 
                                                variant="h6" 
                                                display={"block"} 
                                                textAlign={"center"} 
                                                textTransform={"none"} 
                                                color="white"
                                            >
                                                {folder.name}
                                            </Typography>
                                        </Box>
                                    </Paper> 
                                </Box>
                            ))
                        }
                    </Grid2>
                </> 
            }

            <FolderForm
                showModal={showFolderForm}
                currFolder={currFolder}
                handleClose={handleFolderFormSubmit}
            />

            <PasswordForm 
                showModal={showPasswordForm} 
                handleClose={handlePasswordFormSubmit}
                currPassword={currPassword!}
                folders={folders}
                initFolder={currFolder?.id!}
            />

            <DeleteForm
                showModal={showDeletePassword}
                currEntity={currPassword!}
                isFolder={false}
                handleClose={handleDeletePasswordSubmit}
            />

            <DeleteForm
                showModal={showDeleteFolder}
                currEntity={currFolder!}
                isFolder={true}
                handleClose={handleDeleteFolderSubmit}
            />
        </div>
    )
}
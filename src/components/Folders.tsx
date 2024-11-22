import React, { useEffect, useState } from "react";

import {
    Box,
    IconButton,
    Grid2,
    Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import FolderIcon from '../assets/folder.png'
import Card from './Cards';
import PasswordForm from './PasswordForm';
import FolderForm from "./FolderForm";
import DeleteForm from "./DeleteForm";
import FolderCard from "./FolderCard";

import type { Schema } from '../../amplify/data/resource';
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
        // Show all passwords within folder
        setFolderOpen(true);
        setCurrFolder(folder);
        setFolderPasswords(passwords.filter(p => p.folderId === folder.id));
    }

    function handleCloseFolder() {
        // Hide all passwords
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
                                folderPasswords
                                    .map((password) => (
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
                        width={"41vw"} 
                        height={"5vh"} 
                        justifyContent={"left"}  
                        display={"flex"} 
                        margin={"5vh 0 10px 10%"} 
                        columnGap={"1vw"}
                    >
                        <Button variant="contained" color="primary" onClick={() => setShowFolderForm(true)} >
                            New Folder
                        </Button>
                    </Box>
                    <Grid2 container spacing={2} margin={"0 10%"}>
                        {
                            folders.map(folder => (
                                <FolderCard
                                    key={folder.id}
                                    folder={folder} 
                                    updateFolders={updateFolders}
                                    handleOpenFolder={handleOpenFolder}
                                    setCurrentFolder={setCurrFolder}
                                    showDeleteFolder={setShowDeleteFolder}
                                />
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
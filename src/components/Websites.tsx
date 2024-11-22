import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, MenuItem, TextField} from '@mui/material';

import Search from './SearchBar';
import Card from './Cards';
import PasswordForm from './PasswordForm';
import DeleteForm from './DeleteForm';

import type { Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface Props {
    folderList: Folder[],
    passwordList: Password[],
    updatePasswords: () => void,
}

export default function Websites({folderList, passwordList, updatePasswords}: Props) {
    const [search, setSearch] = useState<string>("");
    const [folderFilter, setFolderFilter] = useState<string>("All");
    const [folders, setFolders] = useState<Folder[]>([]);
    const [passwords, setPasswords] = useState<Password[]>([]);

    const [currPassword, setCurrPassword] = useState<Password|undefined>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);

    function filterPasswords() {
        if (!search && folderFilter === 'All') return passwords; // Return all passwords

        // Filter for selected folder or search term
        const term = search.toLowerCase().trim();
        return passwords.filter((password) => 
            (!search || password.website && password.website?.toLowerCase().includes(term)) &&
            (folderFilter === 'All' || password.folderId === folderFilter)
        );
    }

    useEffect(() => {
        setFolders(folderList);
        setPasswords(passwordList);
    }, [folderList, passwordList]);

    function handleFormSubmit(update?: boolean) {
        if (update) {
            updatePasswords();
        }
        setShowForm(false);
        setCurrPassword(undefined);
    }

    function handleDeleteSubmit(update?: boolean) {
        if (update) {
            updatePasswords();
        }
        setShowDeleteForm(false);
        setCurrPassword(undefined);
    }

    return (
        <div className="main-content">
            <div className="header">
                <Search setSearch={setSearch}></Search>

                <Box sx={{ display: 'flex', color: '#000', margin: "auto", padding: "0 10px"}}>
                    <p style={{marginRight: "10px", color: "white"}}>Folder: </p>
                    <TextField
                        id="folder-input"
                        value={folderFilter}
                        onChange={(e) => setFolderFilter(e.target.value)}
                        select
                        required
                        sx={{bgcolor: "white", borderRadius: "10px"}}
                     
                    >
                        <MenuItem value={'All'}>
                            All
                        </MenuItem>
                        {folders.map((folder) => (
                            <MenuItem key={folder.id} value={folder.id!}>
                                {folder.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </div>

            <Box
                width={"40vw"}
                height={"5vh"}
                justifyContent={"right"}
                display={"flex"}
                margin={"0 0 10px 0"}
                columnGap={"1vw"}
            >
                <IconButton onClick={() => setShowForm(true)} sx={{bgcolor: "#153042"}}>
                    <AddIcon fontSize='small' sx={{color: "white"}}/>
                </IconButton>
            </Box>

            <div className="cards-container">
                {
                    filterPasswords().length ?
                        filterPasswords().map((password) => (
                            <Card 
                                key={password.id}
                                name={password.website!}
                                username={password.username!}
                                pwd={password.hash!}
                                description={password.description!}
                                folder={folders.find(f => f.id === password.folderId)?.name!}
                                selectUpdate={() => {
                                    setCurrPassword(password);
                                    setShowForm(true);
                                }}
                                selectDelete={() => {
                                    setCurrPassword(password);
                                    setShowDeleteForm(true);
                                }}
                            />
                        ))
                        : <p>No websites found</p>
                }
            </div>

            <PasswordForm 
                showModal={showForm} 
                handleClose={handleFormSubmit}
                currPassword={currPassword!}
                folders={folders}
                initFolder={folders.find(f => f.name === 'General')?.id!}
            />

            <DeleteForm
                showModal={showDeleteForm}
                currEntity={currPassword!}
                isFolder={false}
                handleClose={handleDeleteSubmit}
            />
        </div>
    )
}
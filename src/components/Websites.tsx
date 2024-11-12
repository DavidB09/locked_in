import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton} from '@mui/material';

import Search from './SearchBar';
import Card from './Cards';
import PasswordForm from './PasswordForm';

import type { Schema } from '../../amplify/data/resource';
type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface Props {
    folderList: Folder[],
    passwordList: Password[],
    updatePasswords: () => void,
}

export default function Websites({folderList, passwordList, updatePasswords}: Props) {
    //Do the query here to dynamically display cards that have "site-name" == card in cards
    const [search, setSearch] = useState<string>("");
    const [folders, setFolders] = useState<Folder[]>([]); //Get the list of websites from the db
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);

    function filterPasswords() { 
        if (!search) return passwords;

        const term = search.toLowerCase().trim();

        return passwords.filter((password) => 
            password.website && password.website?.toLowerCase().includes(term)
        )
    }

    // const handleDelete = () => {

    // }

    useEffect(() => {
        setFolders(folderList);
        setPasswords(passwordList);
    }, [folderList, passwordList]);

    function handleFormSubmit(update?: boolean) {
        if (update) {
            updatePasswords();
        }
        setShowForm(false);
    }

    return (
        <div className="main-content">
            <div className="header">
                <Search setSearch={setSearch}></Search>
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
                <IconButton sx={{bgcolor: "#153042"}}>
                    <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                </IconButton>
            </Box>

            <div className="cards-container">
                {
                    filterPasswords().length ?
                        filterPasswords().map((password) => (
                            <Card key={password.id} name={password.website!} pwd={password.hash!}/>
                        ))
                        : <p>No websites found</p>
                }
            </div>

            <PasswordForm 
                showModal={showForm} 
                handleClose={handleFormSubmit}
                folderOptions={folders}
                initFolder='General'
            />
        </div>
    )
}
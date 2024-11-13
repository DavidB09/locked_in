import React, { useState } from "react";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { OutlinedInput, IconButton, Box, InputLabel, FormControl } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

interface cardProps {
    name: string,
    username: string,
    description: string,
    pwd: string,
    folder: string,
    selectUpdate: () => void,
    selectDelete: () => void,
}

export default function Card({name, username, description, pwd, folder, selectUpdate, selectDelete}: cardProps) {
    const [reveal, setVisibility] = useState<boolean>(false);
    const [copied, setCopy] = useState<boolean>(false);
    const handleVisibility = () => {
        setVisibility((reveal) => !reveal)
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(pwd)
        setCopy(true)
    }

    return (
        <div className="card">
            <Box sx={{display: "flex", justifyContent: "flex-start"}}>
                <h3 className="site-name">{name} - {folder}</h3>
                <IconButton
                    sx={{bgcolor: "#153042", marginLeft: 'auto'}}
                    onClick={selectUpdate}
                >
                    <CreateIcon fontSize='small' sx={{color: "white"}}/>
                </IconButton>
                <IconButton 
                    sx={{bgcolor: "#153042"}}
                    onClick={selectDelete}
                >
                    <DeleteIcon fontSize='small' sx={{color: "white"}}/>
                </IconButton>
            </Box>
            <div className="password-group">
                <FormControl>
                    <InputLabel htmlFor='display-username'>Username</InputLabel>
                    <OutlinedInput 
                        id='display-username'
                        size='small' 
                        type='text'
                        label='Username'
                        value={username} 
                        readOnly={true}
                        sx={{bgcolor: "#f6f6f6"}} 
                    />
                </FormControl>
            </div>
            <div className="password-group">
                <OutlinedInput 
                    size='small' 
                    type={reveal ? 'text' : 'password'} 
                    value={pwd} 
                    readOnly={true}
                    sx={{bgcolor: "#f6f6f6"}}
                />
                <IconButton onClick={handleVisibility}>
                    {reveal ? <VisibilityOff/>: <Visibility/>}
                </IconButton>
                <button 
                    className="button" 
                    onClick={handleCopy} 
                    onMouseLeave={() => setCopy(false)}
                >
                    {copied ? <CheckIcon sx={{color: "green"}}/> : "Copy"}
                </button>
            </div>
            <div className="password-group">
                <FormControl>
                    <InputLabel htmlFor='display-description'>Description</InputLabel>
                    <OutlinedInput 
                        id='display-description'
                        size='small' 
                        type='text'
                        label='Description'
                        value={description} 
                        readOnly={true}
                        sx={{bgcolor: "#f6f6f6"}} 
                    />
                </FormControl>
            </div>
        </div>
    )
}
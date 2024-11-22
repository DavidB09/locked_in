import React, { useState } from "react";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { OutlinedInput, IconButton, Box, InputLabel, FormControl, AccordionSummary, Accordion, AccordionDetails, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { type Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
const client = generateClient<Schema>();

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
        navigator.clipboard.writeText(client.queries.decrypt({ hash: pwd }).toString())
        setCopy(true)
    }

    return (
        <div className="card">

            <Box sx={{display: "flex"}}>
            <Accordion sx={{ boxShadow: 0}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon /> }>
                <Typography>{name} - {folder} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography >
                    {description}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Box sx={{marginLeft: 'auto'}}>
            <IconButton 
                    sx={{bgcolor: "#153042", marginRight: "5px"}}
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
                        sx={{bgcolor: "#f6f6f6",
                        }} 
                    />
                </FormControl>
            </div>
            <div className="password-group">
                <OutlinedInput 
                    size='small' 
                    value={reveal ? pwd : "•••••••••••"} 
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
        </div>
    )
}
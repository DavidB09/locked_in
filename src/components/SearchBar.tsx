import React, { Dispatch, SetStateAction } from "react";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    setSearch : Dispatch<SetStateAction<string>>
}

export default function Search ({setSearch} :  Props){

    return (
        <Paper 
            component="form"
            sx={{ margin: "2vh 2vh", alignItems: 'center', width: '20vw'}}
        >
            <InputBase 
                sx={{ ml: 2, flex: 1 }} 
                placeholder="Search Websites"
                onInput={(e) => setSearch((e.target as HTMLTextAreaElement).value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
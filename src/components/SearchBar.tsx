import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { Dispatch, SetStateAction } from "react";

interface Sprops {
    setSearch : Dispatch<SetStateAction<string>>
}

export default function Search (props :  Sprops){

    return (
        <Paper component="form"
        sx={{ margin: "2vh 2vh", alignItems: 'center', width: '20vw'}}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Websites"
            onInput={(e) => props.setSearch((e.target as HTMLTextAreaElement).value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
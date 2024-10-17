import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch } from "react";


export default function Search (setSearch : Dispatch<string>){

    return (
        <Paper component="form"
        sx={{ margin: "2vh 2vh", alignItems: 'center', width: '20vw'}}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Websites"
            onInput={(e) => setSearch((e.target as HTMLTextAreaElement).value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
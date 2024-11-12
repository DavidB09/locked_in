import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Search from './SearchBar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Schema } from '../../amplify/data/resource';
import { Box, IconButton} from '@mui/material';
import Card from './Cards';
import Add from './AddItem';

type Folder = Schema['Folder']['type'];
type Password = Schema['Password']['type'];

interface webProps {
  list: Folder[],
  handleForm: Dispatch<SetStateAction<boolean>>
}

export default function Websites ({list, handleForm}: webProps) {
    //Do the query here to dynamically display cards that have "site-name" == card in cards
    const [search, setSearch] = useState<string>("");
    const [websites, setWebsites] = useState<Folder[]>(list); //Get the list of websites from the db
    //Let websites be folder objects. Filter by the Folder.website_name
    // const searchFilter = (search : string, websites : Folder[]) => { 
    //   if (!search) { return websites; }
    //   else {return websites.filter((folder) => folder.passwords.website.toLowerCase().includes(search))}
    // }
    // const displayCards = searchFilter(search, websites);

    // const handleDelete = () => {

    // }
    
    return (
      
        <div className="main-content">
          <div className="header">
            <Search setSearch={setSearch}></Search>
          </div>
          <Box width={"40vw"} height={"5vh"} justifyContent={"right"}  display={"flex"} margin={"0 0 10px 0"} columnGap={"1vw"}>
            <IconButton onClick={() => handleForm(true)} sx={{bgcolor: "#153042"}}>
              <AddIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
            <IconButton sx={{bgcolor: "#153042"}}>
              <DeleteIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
          </Box>
            
          <div className="cards-container">
            {/* Pulling cards from database*/}
            <Card name={"Github"} pwd={"223u10u3"}/>

            
          </div>
        </div>
    )

}
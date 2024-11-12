import { Box, IconButton, Paper, Table, TableBody, TableHead, TableRow, TableCell, Grid2, Typography, Button} from "@mui/material";
import React, { Children, Dispatch, SetStateAction, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FolderIcon from '../assets/folder.png'
import type { Schema } from '../../amplify/data/resource';
import Card from './Cards';

type Folder = Schema['Folder']['type'];

interface folderProps {
    list: Folder[],
    handleForm: Dispatch<SetStateAction<boolean>>
  }

export default function Folders({list, handleForm} : folderProps){
    const [folderOpen, setOpen] = useState<boolean>(false)
    const [folderWebsites, setFolder] = useState<Folder[]>([])
    const handleOpenFolder = ((label) => {
        setOpen(true)
        //Set folderwebsites to all all websites within that folder
    })

    useEffect(() => {
        setOpen(false)
    }, [])

    return (
        <div className="main-content">
        {folderOpen ?
        <>
        <Box width={"40vw"} height={"5vh"} justifyContent={"right"}  display={"flex"} margin={"5vh 0 10px 0"} columnGap={"1vw"}>
            <IconButton onClick={() => setOpen(false)} sx={{bgcolor: "#153042", margin: "0 auto"}}>
            <ArrowLeftIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
            <IconButton onClick={() => handleForm(true)} sx={{bgcolor: "#153042"}}>
            <AddIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
            <IconButton sx={{bgcolor: "#153042"}}>
            <DeleteIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
        </Box>
        {/* //Map folderwebsites and generate respective card */}
        <div className="cards-container">
            <Card name={"test"} pwd={"awliwoqweoqowi3"}/>    
        </div>
        </> 
        :             
        <>
        <Box width={"40vw"} height={"5vh"} justifyContent={"right"}  display={"flex"} margin={"5vh 0 10px 0"} columnGap={"1vw"}>
            <IconButton onClick={() => handleForm(true)} sx={{bgcolor: "#153042"}}>
            <AddIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
            <IconButton sx={{bgcolor: "#153042"}}>
            <DeleteIcon fontSize='small' sx={{color: "white"}}/>
            </IconButton>
        </Box>
        <Grid2 container spacing={2} margin={"0 10%"}>
            <Button onClick={handleOpenFolder}>
            <Paper elevation={5} sx={{width:"25vh", height: "25vh", bgcolor: "#21435A"}}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <img src={FolderIcon}
                style={{height:"20vh", width:"20vh", objectFit: "contain"}}></img>
                </Box>
            <Typography variant="h6" display={"block"} textAlign={"center"} textTransform={"none"} color="white">Personal</Typography>
            </Paper> 
            </Button>   
        </Grid2></>  }
        </div>
        
    )

}
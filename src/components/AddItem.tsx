import { Box, Button, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface addProps {
    fill?: string
    inFolder?: boolean
    handler: Dispatch<SetStateAction<boolean>>
}
export default function Add ({fill, inFolder, handler}: addProps) {

    const handleSubmit = () => { 
        handler(false) //Close form
        //Process newFolder, newPass, newWebsite and send it to the backend for create
    }

    return (
        <>
        <Box height={"100%"} zIndex={998} position={"absolute"} width={"100%"} bgcolor={"black"} sx={{opacity: "50%"}}/>
        <Paper elevation={24}
            sx={{zIndex: 999, margin: "auto", bgcolor: "white", position: "absolute", 
            padding: "2vh", boxShadow: "200", top: "10vh", left: "40vw"}}>
                <Box display={"flex"} justifyContent={"right"}>
                <IconButton size="medium" onClick={()=> handler(false)}>
                    <CloseIcon fontSize="medium"></CloseIcon>
                    </IconButton>
                </Box>
                <Typography variant="h6">Folder: </Typography>
                <OutlinedInput size="small" required label="newFolder" value={fill} readOnly={inFolder}></OutlinedInput>
                <Typography variant="h6">Website: </Typography>
                <OutlinedInput size="small" required label="newWebsite"></OutlinedInput>
                <Typography variant="h6">Password: </Typography>
                <OutlinedInput size="small" required type="password" label="newPassword"></OutlinedInput>
                <Box display={"flex"} justifyContent={"right"} padding={"10px"}>
                    <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Paper>
        </>
    )
}
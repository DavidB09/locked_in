import { Box, Button, TextField, Typography } from "@mui/material";
import {Link} from "react-router-dom"
import { useEffect } from 'react';

export default function SignIn () {

    const getAllProjects = async () => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
                const element = document.getElementById("demo");
                if (element) {
                    element.innerHTML = xhttp.responseText;
                }
                console.log(xhttp.responseText);
            }
        };
        xhttp.open("GET", "https://amplify-hosting.d1s23ufxrrjz1c.amplifyapp.com/users", true);
        xhttp.send();
    }
    
    useEffect(() => {
        getAllProjects();
    }, []);

    return (
        <>
        <Box display="flex" maxWidth={"20%"} flexDirection={'column'} alignItems={'start'} margin={"auto"}>
            <Typography variant="h3">Sign In</Typography>
            <p id="demo"></p>
            <Typography variant="h6">Username</Typography>
            <TextField id="username" label="Username" type="text" variant="outlined" size="small"/>
            <Typography variant="h6">Username</Typography>
            <TextField id="password" label="Password" type="password" variant="outlined" size="small" />
            {/*For now*/}
            <Link className="react-link" to={"/home"}>
            <Button color='primary' variant='contained'  sx={{margin: '10px 10px', borderRadius: '20px'}}>Log In</Button>
            </Link>
        </Box>
        </>
    )

}
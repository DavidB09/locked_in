import { Box, Button, TextField, Typography } from "@mui/material";
import {Link} from "react-router-dom"


export default function SignIn () {

    return (
        <>
        <Box display="flex" maxWidth={"20%"} flexDirection={'column'} alignItems={'start'} margin={"auto"}>
            <Typography variant="h3">Sign In</Typography>
            <Typography variant="h6">Username</Typography>
            <TextField id="username" label="Username" type="text" variant="outlined" size="small"/>
            <Typography variant="h6">Password</Typography>
            <TextField id="password" label="Password" type="password" variant="outlined" size="small" />
            {/*For now*/}
            <Link className="react-link" to={"/home"}>
                <Button color='primary' variant='contained'  sx={{margin: '10px 10px', borderRadius: '20px'}}>Log In</Button>
            </Link>
        </Box>

        
        </>
    )

}
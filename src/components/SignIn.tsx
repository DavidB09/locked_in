import { Box, Button, TextField, Typography } from "@mui/material";


export default function SignIn () {

    return (
        <>
        <Box display="flex" maxWidth={"20%"} flexDirection={'column'} alignItems={'start'} margin={"auto"}>
            <Typography variant="h3">Sign In</Typography>
            <Typography variant="h6">Username</Typography>
            <TextField id="username" label="Username" type="text" variant="outlined" size="small"/>
            <Typography variant="h6">Username</Typography>
            <TextField id="password" label="Password" type="password" variant="outlined" size="small" />
            
            <Button color='primary' variant='contained' sx={{margin: '10px 10px', borderRadius: '20px'}}>Log In</Button>
        </Box>

        
        </>
    )

}
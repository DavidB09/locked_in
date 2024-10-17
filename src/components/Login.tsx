import { Box, Button, styled, TextField, TextFieldProps } from "@mui/material";
import { Link } from "react-router-dom";

export default function LogIn (){
    const StyledInput = styled(TextField)(({ theme}) => (
        {
            variant: "outlined",
            marginTop: "5px",
            marginLeft: "10px",
            marginBottom: "10px",
            size: "small"
        }
    )); 
    
    return (
        <Box display="flex" maxWidth={"30%"} minHeight={'30vh'} flexDirection={'column'} alignItems={'center'} 
        justifyContent={"center"} margin={"auto"} borderRadius={"10px"}
        sx={{background: '#FFFFFF'}}>
            <StyledInput id="username" label="Username" type="text"/>
            <StyledInput id="password" label="Password" type="password"/>
            {/*For now*/}
            <Link to={"/home"}>
                <Button color='secondary' variant='contained' sx={{margin: '10px 10px', borderRadius: '20px'}}>Log In</Button>
            </Link>
        </Box>

    )
}
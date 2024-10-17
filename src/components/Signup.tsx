import { Box, Button, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUp (){
    const StyledInput = styled(TextField)(({ theme}) => (
        {
            marginLeft: "10px",
            marginBottom: "10px",
        }
    )); 

    const StyledText = styled(Typography)(({ theme}) => (
        {
            marginTop: "5px",   
            marginLeft: "10px",
            fontSize: "14px"
        }
    )); 
    
    return (
        <Box display="flex" maxWidth={"30%"} minHeight={'30vh'} flexDirection={'column'} alignItems={'start'} 
        justifyContent={"center"} margin={"auto"} borderRadius={"10px"}
        sx={{background: '#FFFFFF'}}>
            <StyledText>Create a username</StyledText>
            <StyledInput type="text" variant="filled"/>
            <StyledText>Create a password</StyledText>
            <StyledInput id="password" type="password" variant="filled"/>
            <StyledText>Confirm password</StyledText>
            <StyledInput id="password" type="password" variant="filled"/>
            {/*For now*/}
            <Box alignContent={'center'}>
            <Link to={"/home"}>
                <Button color='secondary' variant='contained' sx={{margin: '10px 10px', borderRadius: '20px' }}>Sign Up</Button>
            </Link>
        </Box>
        </Box>


    )
}
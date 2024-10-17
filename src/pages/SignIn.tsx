import { Grid2 } from "@mui/material";
import { Box, Button} from "@mui/material";
import { useState } from "react";
import LogIn from "../components/login";
import SignUp from "../components/signup";


export default function SignIn () {
    const [logInSelect, setLogin] = useState(true);
    const [SignUpSelect, setSignUp] = useState(false);

    //Could be better
    const handleLogin = () => {
        setLogin(true);
        setSignUp(false);
    }
    const handleSignUp = () => {
        setSignUp(true);
        setLogin(false);
    }

    return (
        <>
        <Grid2 container direction={"column"} spacing={2} alignItems={'center'} justifyContent={'center'} margin={'auto'}
         position={'relative'} top={'50%'}>
            <Grid2 size={8}>
            <img
              src="src/assets/logo.png"
              style={{width: "25%", height: "25%", objectFit: "contain"}}></img>
            </Grid2>
            <Grid2 size={8}>
            <Box>
                <Button variant='text' sx={{margin: '0', color: 'white', background: logInSelect ? "#153042" : "null", width:'15%'}}
                onClick={handleLogin}>Log In</Button>
                <Button variant='text' sx={{margin: '0', color: 'white', background: SignUpSelect ? "#153042" : "null", width:'15%'  }}
                onClick={handleSignUp}>Sign Up</Button>
            </Box>
            {logInSelect ? <LogIn/> : <SignUp/>}
            </Grid2>
        </Grid2>
           
        </>
    )

}
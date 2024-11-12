import { VisibilityOff, Visibility } from "@mui/icons-material";
import { OutlinedInput, IconButton } from "@mui/material";
import React, { useState } from "react";

interface cardProps {
    name: string,
    pwd: string
}

export default function Card({name, pwd}: cardProps) {
    const [reveal, setVisibility] = useState<boolean>(false);
    const handleVisibility = () => {
        setVisibility((reveal) => !reveal)
      }
    const handleCopy = () => {

    }
    return (
        <div className="card">
        <h3 className="site-name">{name}</h3>
        <div className="password-group">
          {/*the below "value" is for test purposes */}
          <OutlinedInput size='small' type={reveal ? 'text' : 'password'} value={pwd} readOnly={true}
            sx={{bgcolor: "#f6f6f6"}}></OutlinedInput>
          <IconButton onClick={handleVisibility}>
            {reveal ? <VisibilityOff/>: <Visibility/>}
          </IconButton>
          <button className="button" onClick={handleCopy}>Copy Plain Text</button>  
        </div>
      </div>
    )
}
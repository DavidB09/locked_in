import { VisibilityOff, Visibility } from "@mui/icons-material";
import { OutlinedInput, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";

import { type Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

interface cardProps {
    name: string,
    pwd: string
  }

  const client = generateClient<Schema>();

export default function Card({name, pwd}: cardProps) {
    const [reveal, setVisibility] = useState<boolean>(false);
    const [copied, setCopy] = useState<boolean>(false);
    const handleVisibility = () => {
        setVisibility((reveal) => !reveal)
      }
    const handleCopy = () => {
        navigator.clipboard.writeText(client.queries.decrypt({ hash: pwd }).toString())
        setCopy(true)
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
          <button className="button" onClick={handleCopy} onMouseLeave={() => setCopy(false)}>{copied ? <CheckIcon sx={{color: "green"}}/> : "Copy"}</button>  
        </div>
      </div>
    )
}
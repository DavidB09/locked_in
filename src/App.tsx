import React, { useState } from 'react';

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import imageLogo from './assets/logo.png';

import Dashboard from './pages/Dashboard';

import { NotificationContext, Notification } from "./components/NotificationModal";

import { createTheme, ThemeProvider } from "@mui/material";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
    authMode: "userPool",
});

export default function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1D2D44',
                light: '#F0EBD8'
            },
            secondary: { 
                main: '#21435A',
                light: '#58AAE1'
            },
        }
    });

    const components = {
        Header() {
            return (
                <div style={{textAlign: "center"}}>
                    <img
                        src={imageLogo}
                        style={{width: "50%", height: "50%"}}
                    />
                </div>
            );
        },
    }

    const [notification, setNotification] = useState<Notification>({});

    return (
        <Authenticator components={components} signUpAttributes={['preferred_username']}>
            {() => (
                <ThemeProvider theme={theme}>
                    <NotificationContext.Provider value={{notification, setNotification}}>
                        <Dashboard />
                    </NotificationContext.Provider>
                </ThemeProvider>
            )}
        </Authenticator>
    );
}
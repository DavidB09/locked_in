import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import imageLogo from './assets/logo.png';

import Dashboard from './pages/Dashboard';

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
        main: '#153042'
      },
      secondary: { 
          main: '#3D789F',
          light: '#58AAE1'
      },
    }
  });

  const components = {
    Header() {
  
      return (
        <div  style={{textAlign: "center"}}>
          <img
            src={imageLogo}
            style={{width: "50%", height: "50%"}}
          />
        </div>
      );
    },
  }

  //   const { tokens } = useTheme();
  // const theme = {
  //   name: 'Auth Example Theme',
  //   tokens: {
  //     components: {
  //       authenticator: {
  //         router: {
  //           boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
  //           borderWidth: '0',
  //         },
  //         form: {
  //           padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
  //         },
  //       },
  //       button: {
  //         primary: {
  //           backgroundColor: tokens.colors.neutral['100'],
  //         },
  //         link: {
  //           color: tokens.colors.purple['80'],
  //         },
  //       },
  //       fieldcontrol: {
  //         _focus: {
  //           boxShadow: `0 0 0 2px ${tokens.colors.purple['60']}`,
  //         },
  //       },
  //       tabs: {
  //         item: {
  //           color: tokens.colors.neutral['80'],
  //           _active: {
  //             borderColor: tokens.colors.neutral['100'],
  //             color: tokens.colors.purple['100'],
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <ThemeProvider theme={theme}>
          <Dashboard user={user} signOut={signOut} />
        </ThemeProvider>
      )}
    </Authenticator>
  );
}
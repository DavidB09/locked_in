import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material";



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

  return (
  <>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Routes>
        <Route index element={<SignIn/>}></Route>
        <Route path="home" element={<Dashboard/>}></Route>
      </Routes>
      </ThemeProvider>

      </BrowserRouter>

  </>
  )
}


import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./components/SignIn"
import Dashboard from "./pages/Dashboard";



export default function App() {

  return (
  <>
      <BrowserRouter>
      <Routes>
        <Route index element={<SignIn/>}></Route>
        <Route path="home" element={<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>

  </>
  )
}


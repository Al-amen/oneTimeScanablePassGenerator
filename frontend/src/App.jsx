import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from "react-router";
import RegisterPage from "./pages/RegisterPage"
import Home from './pages/Home';
import PendingUserPage from './pages/PendingUserPage';
import QrCodeShow from './pages/QrCodeShow';
import ValidPage from './pages/ValidPage';






function App() {


  return (
    <>
   
     <BrowserRouter>
        <Home/>
       <Routes>
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/pending" element={<PendingUserPage />} />
         <Route path="/pass_detail/:unique_id" element={<QrCodeShow />} />
         <Route path="/validate/:unique_id" element={<ValidPage />} />
         
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

 

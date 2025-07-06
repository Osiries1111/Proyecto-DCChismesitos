import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './Pages/Index/Index';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Posts from './Pages/PostPage/Posts';
import Navbar from './Components/Navbar/Navbar';


function App() {


  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Index />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/perfil"} element={<Profile />}/>
        <Route path={"/posts"} element={<Posts />}/>

      </Routes>
    </BrowserRouter>

  )
}

export default App

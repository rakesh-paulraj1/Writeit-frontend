import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import {  Dashboard } from "./pages/Dashboard";
import { Publish } from './pages/Publish';
import { User } from './pages/User';
import { Profile } from './pages/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/user/:id" element={<User/>} />
          <Route path="/profile" element={<Profile/>}/>
         

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
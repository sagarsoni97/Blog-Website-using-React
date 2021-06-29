import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Home from './Components/Home';
import CreateBlog from './Components/CreateBlog';
import BlogDetails from './Components/BlogDetails';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import { auth, db, storage, serverTimestamp, id } from './firebaseConfig';

function App() {
  const [user,setUser] = useState(null)
  useEffect(()=>{
       auth.onAuthStateChanged(user=>{
         if(user) setUser(user)
         else setUser(null)
       })
  },[])
  return (
    <>
      <Navbar user={user}/>
    </>
  );
}

export default App;

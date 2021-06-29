import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import {auth, db, storage, serverTimestamp} from '../firebaseConfig';

const Protected = (props) => {

    let Cmp = props.Cmp

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
          if(!user){
           history.push('/')
          }
        })
   },[])

   const history = useHistory()

    return (
        <div>
            <Cmp />
        </div>
    )
}

export default Protected

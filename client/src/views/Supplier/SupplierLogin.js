import React from 'react'
import {useState,useEffect} from 'react'

import { useDispatch,useSelector } from 'react-redux';
import { loginSup } from '../../actions/supplierAction';
import "./SupplierLogin.css"
export default function SupplierLogin() {

    const [email,setEmail]=useState('');
    const [password,setPass]=useState('');
  
    const dispatch=useDispatch()
    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    
    // const {loadingx,successx}= useSelector( state=>state.loginUserReducer);
    
    function loginWithSupplier(){
        
      if(  !email   || !password ||  !email.match(/.+@.+/) ){
        alert("Fill Up Every Field Correctly")
        return 
      }
       const user={
         email, password
       }
       console.log("LOGIN SUPPLIER :",user);
        dispatch(loginSup(user))
    
  
  }
   
    return (
      <div>
      <div class='bold-line'></div>
     <div class='container'>
       <div class='window'>
         <div class='content'>
           <div class='welcome'> Supplier Login!</div>
           <div class='subtitle'></div>
           <div class='input-fields'>
            
             <input type='email' placeholder='Email' class='input-line full-width'
                value={email} onChange={(e) => setEmail(e.target.value)} required 
             ></input>
             <input type='password' placeholder='Password' class='input-line full-width'
               value={password} onChange={(e) => setPass(e.target.value)} required 
             ></input>
  
           </div>
           <div><button class='ghost-round full-width' onClick={loginWithSupplier} > Log in </button></div>
         </div>
  
       </div>
     </div>
   </div>
    )
  }
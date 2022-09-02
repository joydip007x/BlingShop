import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';

import { loginUser } from '../../actions/userAction';
import {checkLoggedAsAdmin} from '../Homescreen';

import './UserLogin.css'

export default function UserLogin() {

  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');

  const dispatch=useDispatch()
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    
      checkLoggedAsAdmin();
      if (localStorage.getItem('currentUser')){

        setTimeout(this, 500)
        notify('',"Fill Up Every Field Correctly",400)
        window.location.href='/'
      }
    
  }, [])
  
  const {loadingx,successx}= useSelector( state=>state.loginUserReducer);

  const notify = (callId,msg,timex) => {

    if(callId==='' || callId==='passNotMatch'){
      return toast.warning(msg, {position: toast.POSITION.TOP_CENTER,autoClose:timex})
    }
    if(callId==='reg' ){
       toast.success(msg, {position: toast.POSITION.TOP_CENTER,autoClose:timex})
    }
  }
  
  function loginWithUser(){
      
    if(  !email   || !password ||  !email.match(/.+@.+/) ){
      if(!email.match(/.+@.+/)){setEmail('')}
      return notify('',"Fill Up Every Field Correctly",1000)
    }
     const user={
       email, password
     }
     console.log("LOGIN :",user);
     dispatch(loginUser(user))
    

}
 function redi(){
   window.location.href="/register"
 }
  return (
    <div>
    <div class='bold-line'></div>
   <div class='container'>
     <div class='window'>
       <div class='content'>
         <div class='welcome'>Sign In !</div>
         <div class='subtitle'></div>
         <div class='input-fields'>
          
           <input type='email' placeholder='Email' class='input-line full-width'
              value={email} onChange={(e) => setEmail(e.target.value)} required 
           ></input>
           <input type='password' placeholder='Password' class='input-line full-width'
             value={password} onChange={(e) => setPass(e.target.value)} required 
           ></input>

         </div>
         <div><button class='ghost-round full-width' onClick={loginWithUser} > Log in </button></div>
       </div>
       <i class="fas fa-user-plus" onClick={ redi }></i>

     </div>
   </div>
 </div>
  )
}

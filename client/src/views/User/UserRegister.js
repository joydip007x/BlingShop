import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';

import { registerUser } from '../../actions/userAction';
import {checkLoggedAsAdmin} from '../Homescreen';

import "./UserRegister.css"

export default function UserRegister() {
  
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');
  
  const notify = (callId,msg,timex) => {

    if(callId==='' || callId==='passNotMatch'){
      return toast.warning(msg, {position: toast.POSITION.TOP_CENTER,autoClose:timex})
    }
    if(callId==='reg' ){
       toast.success(msg, {position: toast.POSITION.TOP_CENTER,autoClose:timex})
    }
  }
  
  checkLoggedAsAdmin() ;
  const dispatch=useDispatch()

  const {loading,success}= useSelector( state=>state.registerUserReducer);
  //console.log("regState "+loading , success);

  function register(){
      
      if( !name || !email   || !password ){

        return notify('',"Fill Up Every Field Correctly",1000)
      }
     
       const user={
         name,email, password
       }
       dispatch(registerUser(user))
       
  }
  return (
    <div>
       <div class='bold-line'></div>
      <div class='container'>
        <div class='window'>
          <div class='content'>
            <div class='welcome'>Hello There!</div>
            <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
            <div class='input-fields'>
              <input type='text' placeholder='Username' class='input-line full-width'
                 value={name} onChange={(e) => setName(e.target.value)} required 
              ></input>
              <input type='email' placeholder='Email' class='input-line full-width'
                 value={email} onChange={(e) => setEmail(e.target.value)} required 
              ></input>
              <input type='password' placeholder='Password' class='input-line full-width'
                value={password} onChange={(e) => setPass(e.target.value)} required 
              ></input>

            </div>
            <div><button class='ghost-round full-width' onClick={register}> Create Account</button></div>
          </div>
        </div>
      </div>
    </div>
  )
}

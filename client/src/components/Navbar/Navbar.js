import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
// import bootstrap from '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { logoutUser } from '../../actions/userAction'
import {logoutAdmin} from '../../actions/adminAction'
import { Card } from 'react-bootstrap';

export default function Navbar() {

  const cartState = useSelector(state=>state.cartReducer)
  const userState = useSelector(state=>state.loginUserReducer)
  const adminState = useSelector(state=>state.verifyAdminReducer)
  const {currentUser}= userState
  const {currentAdmin}= adminState

  const dispatch= useDispatch()
  function doIT(){    
    dispatch(logoutAdmin())
    dispatch(logoutUser())

  }
  console.log("Dispatch ",currentAdmin,currentUser)

  const title_style={fontWeight:"bold",fontSize:"25px"  }
  const space_keep={visibility: 'hidden'}
  return (
    <div className="whole_navbar">
      <nav className="navbar nav_component navbar-expand-lg  shadow-lg p-3 mb-5   ">
        <a className="navbar-brand" href="/">
          <b style={title_style}>Blink</b>-Commerce
        </a>
           <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
         >
         <span className="navbar-toggler-icon"  data-bs-toggle="dropdown"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

      
        <link rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
         
         <li className="nav-item" id="nav-home-icon">
              <a className="nav-link " href="/" > 
              <i class="fa fa-university" id="icon33" aria-hidden="true"></i>
              </a>
        </li>

          <Card className="x556">
          
            { (currentUser || currentAdmin) ? 
            (

              <div id="x333"><button type="button"  
              onClick={()=>{ window.location.href='/orders'}}
              href="/orders"> MY Orders</button>
              <button  type="button"
              onClick={ doIT}
              >LogOut</button></div>
              

            ):   /* ################ */
            <div class="dropdown">
              <a class="userBtn dropdown-toggle  "  id="dropdownMenu2" data-bs-toggle="dropdown" >
            

                <ph id="okok">LOGIN</ph>  
              </a>
              <ul class="dropdown-menu"  aria-labelledby="dropdownMenu">
               
                <a><button class="dropdown-item" type="button"  
                href="/admin"   onClick={()=>{ window.location.href='/admin'}} >as Admin</button></a>
                <a><button class="dropdown-item" type="button"
                 href="/login"   onClick={()=>{ window.location.href='/login'}}>as User</button></a>
              </ul>  
            </div>
            
            }

         
           
            
          </Card>
        </div>
      </nav>
    </div>
  );
}

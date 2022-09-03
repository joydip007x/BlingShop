import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getAllProducts} from '../actions/productAction'
import Product from '../components/SingleProduct/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './Admin/AdminLogin';
import "./Homescreen.css"
import { Card } from 'react-bootstrap';
import { logoutAdmin } from '../actions/adminAction';

export default function Homescreen() {

  const dispatch=useDispatch()

  const productState= useSelector( state=>state.getAllProductsReducer)
  const { products, error, loading }= productState;
  
  const logState=!(!localStorage.getItem('currentAdmin'));
  
  useEffect(() => {

    if (!logState){
       checkUser()
       dispatch(getAllProducts())
    }
}, [])

function redi(){
  window.location.href="/addItem"
}
function redi2(){
  window.location.href="/orders"
}
  //  console.log(logState)
 
  return (
    <div>   
        <div className='row justify-content-center homescreenContainer'>

        { logState ? 
          (<div><p>  
                <div id="some1" className='shadow-lg p-3 mb-5 rounded'> 
                  <h3> Admin's Roles : </h3>
                  <i class="fa fa-list-ul fa-2x" aria-hidden="true"  onClick={ redi2 }> <gg>VERIFY ORDERS</gg></i>
                  <br></br>
                  <i class="fas fa-cart-plus" onClick={ redi }> <gg>ADD ITEM</gg></i>
                  <br></br>
                  <i class="fa fa-sign-out" onClick={ ()=>dispatch(logoutAdmin()) }> <gg>Log Out</gg></i>

                </div>  
           </p></div> ): 
        
          ( loading ? (<div class="load_hold"> <div class="dots-bars-3">  </div></div>): 
            error ? (<html_h1>Wrong</html_h1>):
            (
              products.map(product => {
              return <div  className='col-md-4 m-6 mt-3 margTop'key={product._id}>
                <Product product={product} />
              </div>
            })
            )
          )
        
        }
           { !logState &&
            <Card className="emni shadow-lg p-3 mb-5 rounded" id="nav_link_cart">
              <a className="nav-link " href="/cart" >
              <i class="fa fa-shopping-basket fa-2x" aria-hidden="true">CART</i>
              </a>
            </Card>}
        </div>
    </div>
  )
}
export const notify = (callId,msg,timex) => {

  if(callId==='noUser'){return toast.error(msg, {position: toast.POSITION.TOP_CENTER,autoClose:timex})}
  if(callId==='redirect'){return toast.info(msg, {position: toast.POSITION.TOP_RIGHT,autoClose:timex})}
}
export const checkUser=()=>{
  if (!localStorage.getItem('currentUser')){
  
    setTimeout(() =>   window.location.href='/login', 50);
  

  }
}

export const checkLoggedAsAdmin=()=>{

  if (localStorage.getItem('currentAdmin')){
  
    setTimeout(() =>   window.location.href='/', 3000);
    notify('noUser',"You are logged in as admin",2000)

  }
}

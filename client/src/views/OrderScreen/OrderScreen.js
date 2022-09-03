import React,{Component,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux' 
import { useEffect } from 'react'
import { getUserOrders } from '../../actions/orderActions'
import {getAllOrders,verifyAOrder,updateAdminBalance} from '../../actions/adminAction'
import { checkUser } from '../Homescreen';
import {Modal} from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './OrderScreen.css'

export default function OrderScreen () {

  const dispatch = useDispatch()
  const adminState = useSelector(state=>state.verifyAdminReducer)
  const {currentAdmin}= adminState
 
  const [UIDPass,setUIDPass]=useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose_withConfirm = (order) => { 
    
    if(UIDPass !=currentAdmin[0].password ){
      console.log(currentAdmin[0].password," vs You vs ",UIDPass);
     alert("Admin's Credential Doesn't Match")
      setUIDPass("")
      setShow(false);
      return;
    }
    setUIDPass("")
    console.log('Accpeted'+order._id); 
    dispatch(verifyAOrder({orderid:order._id}))
    dispatch(updateAdminBalance(currentAdmin[0].email,order.orderAmount))
    alert.success("Order Forwared to Supplier "+order._id)
    setShow(false);
  }

  

  const handleShow = () => setShow(true);


  useEffect(()=>{

    if (!logState){

     dispatch(getUserOrders())
     checkUser()
    }
    else{
      dispatch(getAllOrders())
    }

  },[])


  const orderstate = useSelector(state=>state.getUserOrdersReducer)
  const orderstateAdmin = useSelector(state=>state.getAllOrdersReducer)
  const logState=!(!localStorage.getItem('currentAdmin'));
  var orders,error,loading;

  if(logState){    ({orders,error,loading}= orderstateAdmin) }
  else {  ( {orders,error,loading}= orderstate)}


  return (
    <div className='orderScreenHolder'>  
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

       { 
          !logState ? 
          (<hh style={{fontSize: '35px'}}>Orders </hh>) : 
          (<hh id="oid1" style={{fontSize: '35px'}}>Orders </hh>)
       }
       { 
        (
          <div className='row justify-content-center'>
             { loading && <div> Loading... </div>}
             { error && <div> Something went wrong... </div>}
             {   orders && orders.map( order=>{

                  return <div className='col-md-12 pp shadow-lg p-3 mb-0 bg-white rounded '>
                    {console.log("JS PAGE OS.js" ,order)}
                     <div className='flex-container'>
                          <div className="text-left w-100 m-1 ">
                            {/* <h2 style={{fontSize:'25px'}} >Items</h2> */}
                            <ch1> Transaction Id :{ order.transactionId}</ch1>
                          
                         </div>
                         <div className="text-left w-100 m-1 ">
                            <ch1> Date : {order.createdAt.slice(0, 10)} </ch1>
                         </div>

                          <div className="text-left w-100 m-1 "> 
                           {/* <h2 style={{fontSize:'25px'}} >Address</h2> */}
                           <ch1> Ship To : {order.shippingAddress}</ch1>
                         
                        

                          </div >
                          {/*  */}
                          <div className="text-left w-100 m-1 pp2">
                          {/* <h2 style={{fontSize:'25px'}} >Order Info</h2> */}
                          <ch1> Order Amount : { order.orderAmount}</ch1>
                          <br></br>
                          {/* <ch1> Transaction Id :{ order.transactionId.slice(12)}</ch1> */}
                          <br></br>
                          <br></br>
                          <br></br>
                          
                         
                          </div>  
                          <div className="ExtendedOrder"> 
                          {logState && order.isDelivered===0 &&
                          
                          
                          <div /*class="circle small"*/>
                          {/* <h3>GFDA / No. 65</h3> */}
                          <button className="btn23 h1" onClick={handleShow}>accept order</button>
                          {/*-----------------M--O--D--A--L------------------------*/}
                          { 
                          <Modal show={show} className='modal modal_window' >
                            <Modal.Header closeButton onClick={handleClose}>

                              <Modal.Title className="pTname ">{"Trx Id. : "+order.transactionId}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                              <p className="pCname ">{"Customer Name : "+ order.name}</p>
                              <p className="pAdd ">{"Adress : "+order.shippingAddress}</p>
                          
                              <p className="pmsg">{"Amount Paid : "+order.orderAmount}</p>
                              
                              <p className="pMsg ">{"Confirm this Order?"}</p>
                           
                             <div class="center">
                              <div class="float-input">
                                <input type="password" placeholder="Enter Admin Password" 
                                value={UIDPass}  onChange={(e)=>setUIDPass(e.target.value)} required
                                />
                              </div>
                            </div>

                            </Modal.Body>

                            <Modal.Footer>
                                <div className="btn-white accpet clshov" onClick={ handleClose}>CLOSE</div>
                                <div className="btn nclshov" onClick={ ()=>handleClose_withConfirm(order) }>Accept</div>

                            </Modal.Footer>
                          </Modal>
                          }
                        </div>
                          }
                          {
                            !logState && order.isDelivered===0 &&
                            <div className='fixarea'>
                            <p id="fixt1">Under Admins Confirmation</p>  
                            </div>
                          }
                         { /*-------------------*/}
                          {
                           order.isDelivered===2 &&
                          <div className='fixarea'>
                        
                          {logState ? <p id="fixit3">Supplied</p> : <p id="fixit3">Products Received</p>  }

                          </div>
                          }
                           {
                          order.isDelivered===1 &&
                          <div className='fixarea'>
                          
                          <p id="fixt2"> Hold by Supplier</p>

                          </div>
                          }

                          </div>
                    </div>
                    </div>

              })  
             }
          </div>) 
    }
     
    </div>
  )
}

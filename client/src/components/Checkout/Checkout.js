import React ,{Component,useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch,useSelector } from 'react-redux';

import { placeOrder } from '../../actions/orderActions';
import {updateBalance} from '../../actions/adminAction';
import {Modal} from 'react-bootstrap'

import './Checkout.css'
export default function Checkout({subtotal}) {

  const dispatch= useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [UIDPass,setUIDPass]=useState("")
  const [email,setEmail]=useState('');
  const [password,setPass]=useState('');
  const [sAdd,setsAdd]=useState('');

  const orderState= useSelector((state)=> state.placeOrderReducer)
  const userState = useSelector(state=>state.loginUserReducer)

  const {currentUser}= userState
  const {loading,error,success}=orderState;

   const cartItemsState =  useSelector((state)=> state.cartReducer) 
   const cartItems= cartItemsState.cartItems;
  function tokenHander(token) {
    console.log(token)
    dispatch(placeOrder(token,subtotal))
    dispatch(updateBalance(currentUser.email,subtotal))
    {console.log("EFFECT " ,loading)}

  }
  function GenerateID(){
    
    var length= 9;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
   }
    return "token- "+result;
  }
  const handleClose_withConfirm = () => { 
    
    if(email!=currentUser.email){

      alert("Enter Your registered email")
      setEmail("");
      setPass("");
      setsAdd("");
      return;
    }
    if(password!=currentUser.password){

      alert("Password Mismatch! \n Can not complete Payment")
      setEmail("");
      setPass("");
      setsAdd("");
      return;
    }
    const order={
      name :currentUser.name,
      email:currentUser.email,
      userid:currentUser._id,
      orderItems:cartItems,
      shippingAddress:sAdd,
      orderAmount: subtotal,
      transactionId : GenerateID()
    }
    console.log("Created Order - ",order);
    setEmail("");
    setPass("");
    setsAdd("");
    dispatch(placeOrder(order));
    // alert("ORDER PLACEMENT successful\n ", "Order id- ",order.transactionId)
    dispatch(updateBalance(currentUser.email,subtotal));
    setShow(false);



  }

  

  const handleShow = () => setShow(true);

  return (

    <div>
      
    <div>

        { console.log(" return " ,loading) }
        
         {
         !success && !loading &&

         <div>
              
              <button className='btn_checkout' onClick={handleShow }>Pay Now </button>

              <Modal show={show} className='modal modal_window' >
                            <Modal.Header  id="md1" closeButton onClick={handleClose}>
                              <Modal.Title className="pTname ">{"CHECKOUT MENU "}</Modal.Title>
                            </Modal.Header >

                            <Modal.Body id="md1">
                             <div>
                             <div id='md2' >
                              {cartItems.map(item=>{

                                return <div >
                                  <h1 id="spfont"> {item.name} {item.varient}* {item.quantity} Unit= {item.price}</h1>
                                  </div>
                                })}
                                </div>
                                <br></br>
                                <div class="form-group">


                                <input type="email" class="form-control"
                                  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
                                  value={email} onChange={(e) => setEmail(e.target.value)} required 
                                  />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                              </div>
                              
                             
                              <div class="form-group">
                                  
                                <input type="password" class="form-control"
                                  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter  Secret Key" 
                                  value={password} onChange={(e) => setPass(e.target.value)} required 
                                  />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your Key too !</small>
                              </div>

                              <div class="form-group">
                                  
                                  <input type="text" class="form-control"
                                    id="exampleInputEmail1" aria-describedby="addHelp" placeholder="Enter Shipping Address" 
                                    value={sAdd} onChange={(e) => setsAdd(e.target.value)} required 
                                    />
                                  <small id="emailHelp" class="form-text text-muted"><br></br></small>
                                </div>

                              <div>

                                 <p id="pSub1">Your Current Balance: <p2>{currentUser.bdt} TK</p2></p>
                                 <p id="pSub1">You will pay <p1>{subtotal} /= </p1>from your Savings</p>

                              </div>

                             </div>
                             
                            
                            </Modal.Body>

                            <Modal.Footer id="md1">
                                <div className="btn-white accpet clshov" onClick={ handleClose}>CLOSE</div>
                                <div className="btn nclshov" onClick={ ()=>handleClose_withConfirm()} >Accept</div>

                            </Modal.Footer>
                          </Modal> 
         </div>
        // <StripeCheckout

        //  amount={subtotal*100}
        //  shippingAddress
        //  token={tokenHander}
        //  currency='BDT'
        //  stripeKey='pk_test_51LJdoPD9PVEyJI4UvvDlPGKKTlwUQOYffUqygRZU8snRITH4WQoCGQwsZWEdubhMNfxplKJAlBN4Mdg6BfBMzk0g00ADD0ottW'

        // >
        //    <button className='btn_checkout'>Pay Now </button> 
        // </StripeCheckout>
        }
   
    </div>
    </div>
  )
}

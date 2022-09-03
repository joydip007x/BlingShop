import React,{useState,useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux';

import { addToCart,deleteFromCart } from '../actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { checkUser } from './Homescreen';
import Checkout from '../components/Checkout/Checkout';


export default function CartScreen() {

  checkUser();
  const[ var2p,setVar2p ]=useState(1);

  const notify = (callId,msg) => {

    toast.clearWaitingQueue({containerId:'default'});
    if(callId==='limit'){
      return toast.info(msg, {position: toast.POSITION.TOP_CENTER,autoClose: 1000})
    }
    toast('Default!', { position: toast.POSITION.BOTTOM_LEFT })

  }
  const cartState= useSelector(state=>state.cartReducer)
  const cartItems= cartState.cartItems

  const dispatch=useDispatch()
  // const temp="JSON.stringify(item.prices[0]).split(',')[0].split(':')[1]"

  function chngQ(item){
    
    dispatch(addToCart(item,parseInt(var2p),item.varient))
  }
  function removeItemCart(item){
      dispatch(deleteFromCart(item))
  }

  var subtotal=cartItems.reduce((x,item)=>x+item.price,0)
///////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div id='basic_container'>
      
      <ToastContainer limit={1} containerId="default"/>
        <div className='row justify-content-center' id='consumeBody'>
          
          
           <div className='col-md-6 cartContainer'>

             
              {
              cartItems.length ==0  ?
                <div id="noItemDiv"> 
                  <h3 id='noItemsinCart'><a>ADD Some Items in your cart</a></h3> 
                </div> :
                
              (cartItems.map(item=>{

                /*default prize = Price of First Variant of the Product */
               const defaultPrize=JSON.stringify(item.prices[0]).split(',')[0].split(':')[1];  
                {console.log(item.varients )}
                return <div className='flex-container shadow-lg p-1 mb-5 rounded'>

                  <div>
                <i className='fa fa-ban mt-5 w-100' 
                  id='cartPageIconTrash' aria-hidden="true" onClick={()=>removeItemCart(item)}>

                  </i>
                </div>
                <div>
                 <img  className='m-1 w-100' id="cartPageProdImg" src={item.image}  ></img>
                </div>

                <div className='UnitpriceFlex m-1 w-100 text-left'>
                    <custom_h1 className="type1_text">{item.name } 
                    
                    </custom_h1>

                    <custom_h1 className="type2_text"><></>
                    {item.quantity} Unit
                   </custom_h1>
                  <div className='myL'>
                    <input type="number" id="Qid"
                    className="form-control " placeholder={item.quantity} 
                       value={var2p}  onChange={(e)=>{setVar2p(e.target.value); chngQ(item)}} 
                      
                      />
                    </div>

                    <div className="type2_text">

                   
                    <hr/>
                    
                    </div>
                    
                </div>
               
                
              
              </div>

              }))
              
            }
            </div>
           
           { 
           cartItems.length !=0  && 
           <div className='col-md-4 flex-container subtotal text-right'>

                  <h1 className='type3_text subt'>Payment : { subtotal} TK </h1>
                  <Checkout  subtotal={subtotal} />
           </div>

            }

        </div>
    </div>
  )
}

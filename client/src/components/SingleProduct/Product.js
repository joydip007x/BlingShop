import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import {addToCart} from '../../actions/cartActions'
import {checkUser,notify} from '../../views/Homescreen'
export default function Product({product}) {
  
  const [ quantity , setQuantity]= useState(1)
  const [ varient , setvarient]= useState("null")
  

  const randomInt=Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  const defaultVarient=product.varients[0]
  //console.log(randomInt);

  let CalculatedPrice= 0;
  if(varient=="null") 
      CalculatedPrice=(JSON.stringify(product.prices[0]).split(',')[0].split(':')[1] * quantity).toFixed(2) ;
  else CalculatedPrice=(product.prices[0][varient]*quantity).toFixed(2);

  const dispatch= useDispatch();

  function addToCartHandle(){
    if (!localStorage.getItem('currentUser')){ return checkUser()}
    dispatch(addToCart(product,quantity,varient!='null' ? varient:defaultVarient));
  }

  return (

    <div className="Spizza_container  p-3 mb-5  rounded" >
      <h1 className="html_h1">{product.name}</h1>
      <img src={product.image} className="img-fluid single_el_img" />

      <div className="flex-container">
        <div className="w-100 m-1">

          <p>Varients</p>
          <select className='flex_class_option form-control' initial  value={varient} 
          onChange={(e)=>{setvarient(e.target.value)}}>
            
            {product.varients.map((varient) => {
              return <option value={varient}> {varient}</option>;
            })}
          </select>

        </div>
       
      </div>
     
      <div class="flex-container"> 
          
          <div className='Pizprices m-1 w-100 '>
                <html_h2 className="mt-1">
                  Price : {CalculatedPrice} BDT/=
                </html_h2>
          </div>

          <div className='m-1 w-100'>
              <div className="btn" onClick={addToCartHandle}>Add to Cart</div>
          </div>
       </div>

     
    </div>
  );
}

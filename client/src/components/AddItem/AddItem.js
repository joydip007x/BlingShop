import React,{useState,useEffect} from 'react'
import './AddItem.css'
import { useDispatch,useSelector } from 'react-redux';
import  {addNewProducts} from '../../actions/productAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddItem() {

  const dispatch= useDispatch();
  const [name,setName]=useState('');
  const [Img,setImg]=useState('');
  const [var1,setVar1]=useState('');
  const [var2,setVar2]=useState('');
  const[ var1p,setVar1p ]=useState(0);
  const[ var2p,setVar2p ]=useState(0);

  function reqItemADD(){
  
  if(!var1 || !name  || !Img || !var1p ){
    alert("Fill Properly")
    return;
  }
  let arrVarients=[var1];
  let arrPrices=new Map(); 
  arrPrices[var1]=parseInt(var1p);
  if(var2){arrVarients.push(var2);  arrPrices[var2]=parseInt(var2p);  }

  let xap=[arrPrices]
   console.log(arrVarients+ "   x  "+JSON.stringify(xap));

  const newItem={

     name,
     image:Img,
     varients: arrVarients,
     prices: xap,
   }
   console.log(newItem)
   dispatch(addNewProducts(newItem))
  }


  return (
    <div>       

       <div class='signup-container'>
  <div class='left-container'>

  </div>
  <div class='right-container'>
    <header>
      <hx id='titleatt'>Add Product</hx>
      <div class='set2 set3'>
        <div class='prod-name'>
          <input id='prod-name' placeholder="Product's name" type='text'
           value={name}  onChange={(e)=>setName(e.target.value)} required
          />
        </div>
        {/* <div class='pets-photo'>
          <button id='pets-upload'>
            <i class='fas fa-camera-retro'></i>
          </button>
          <label for='pets-upload'>Upload a photo</label>
        </div> */}
      </div>
      
     
      <div class='pets-weight'>
      <div class="input ">
       <div class="input-group-prepend vn1">
        </div>
        <input type="text" className="" id='nn1' placeholder='Varient 1'
         value={var1}  onChange={(e)=>setVar1(e.target.value)} required
        />
        <input type="text" className=""  id='nn1'placeholder='Varient 2'
        value={var2}  onChange={(e)=>setVar2(e.target.value)} 
        />
       
        </div>
          
      </div>

      <div class='pets-weight'>
      <div class="">
       <div class="input-group-prepend vn1">
        </div>
        <input type="number" className="form-control " placeholder='Price V1'
         value={var1p}  onChange={(e)=>setVar1p(e.target.value)} required

        />
        <input type="number" className="form-control " placeholder='Price V2' 
        value={var2p}  onChange={(e)=>setVar2p(e.target.value)} 
        />

        <input id='' placeholder='https://imgur.com/Uc4d1t6' type='text'
         value={Img}  onChange={(e)=>setImg(e.target.value)} required
         />
      </div>
          
      </div>
    </header>
    <footer>
      <div class='set'>
        <button id='back'   onClick={ ()=> window.location.replace('/')}>Back</button>
        <button id='next' onClick={ reqItemADD }>Next</button>
      </div>
    </footer>
  </div>
</div>

    </div>

  )
}

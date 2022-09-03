import axios from 'axios'
const delay = ms => new Promise(res => setTimeout(res, ms));

export const placeOrder =(order)=> async(dispatch, getState)=>{ 

    dispatch({type:'PLACE_ORDER_REQUEST'})
    const currentUser= getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems
    try{

        const response=await axios.post('/storeAPI/orders/placeOrder',{order});
        dispatch({type:'PLACE_ORDER_SUCCESS'})
        localStorage.removeItem('cartItems');
        await delay(3000);
        window.location.href='/cart'
        // window.location.href='/cart'
       // alert("ORDER PLACEMENT successful\n ", "Order id- ",order.transactionId)
        // console.log(response.json());

    }catch(error){
        dispatch({type:'PLACE_ORDER_FAILED'})
    }
}
export const getUserOrders=()=>async (dispatch,getState)=>{

    const currentUser= getState().loginUserReducer.currentUser
    console.log("GET USER ORDER ",currentUser);
    dispatch({type:'GET_USER_ORDERS_REQ'})

    try {
        const response = await axios.get('/storeAPI/orders/getuserorders',
        {params: {userid: currentUser._id}})
        // console.log(response.data)        
        // console.log(" FRONT GETUSER RED : ",response.data)
        dispatch({type:'GET_USER_ORDERS_SUCCESS', payload: response.data})

    } catch (error) {
        dispatch({type:'GET_USER_ORDERS_FAILED' , payload:error})
    }

}
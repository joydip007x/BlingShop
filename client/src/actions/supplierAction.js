import axios from 'axios'
const delay = ms => new Promise(res => setTimeout(res, ms));

export const loginSup=(user)=>async dispatch=>{

    dispatch({type:'SUP_LOGIN_REQUEST'})
    try {
        console.log("SuppActionLogin",user)
        const response=await axios.post('/supplyAPI/users/login', user)
        console.log("SuppActionLogin",response)
        dispatch({type:'SUP_LOGIN_SUCCESS',payload:response.data})
        localStorage.removeItem('currentUser')
        localStorage.removeItem('currentAdmin');
        localStorage.setItem('currentSup',JSON.stringify(response.data))

        await delay(2500);
        window.location.href='/supplierPage'
    
    }
    catch(error){
        dispatch({type:'SUP_LOGIN_FAILED',payload:error})
    }
}
export const logoutSup=()=>dispatch=>{

    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('currentUserUID');
    localStorage.removeItem('currentSup');
    window.location.href='/login'
}


export const getAllOrdersSup=()=>async dispatch=>{

    dispatch({type:'GET_All_ORDER_REQ_SUP'})

    try {
        const response = await axios.get('/supplyAPI/orders/getAllOrders')
        console.log(response)
        dispatch({type:'GET_All_ORDER_SUCCESS_SUP', payload: response.data})

    } catch (error) {
        dispatch({type:'GET_All_ORDER_FAILED_SUP' , payload:error})
    }

}

export const ShippingAOrder=(orderid)=>async dispatch=>{

    dispatch({type:'GET_SHIP_ORDER_REQ'})
    console.log("ShiipingAOrder Action : ",orderid)
    try {
        const response = await axios.post('/supplyAPI/orders/ShippingAOrder',orderid)
        console.log(response)
        dispatch({type:'GET_SHIP_ORDER_SUCCESS', payload: response.data})
        window.location.href='/'

    } catch (error) {
        dispatch({type:'GET_SHIP_ORDER_FAILED' , payload:error})
    }

}

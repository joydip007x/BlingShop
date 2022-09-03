
export const loginSupReducer= (state={},action)=>{

    switch(action.type){

        case 'SUP_LOGIN_REQUEST': return {

            loadingx:true,
            successx:false,
        }
        case 'SUP_LOGIN_SUCCESS': return {

            loadingx:false,
            successx:true,
            CurrentSup:action.payload
        }
        case 'SUP_LOGIN_FAILED': return {

            loadingx:false,
            successx:false,
            error:action.payload
            
        }
        default : return state;
    }
}

export const getAllOrdersReducerSup = (state={ orders:[] }, action) =>{
         

    switch(action.type){

        case 'GET_All_ORDER_REQ_SUP':
            return { loading:true,...state }
        case 'GET_All_ORDER_SUCCESS_SUP':
            return { loading:false,orders:action.payload} 
        case 'GET_All_ORDER_FAILED_SUP':
            return { loading:false,orders:action.payload}
            
        default: return state
    }

}
export const ShippingAOrderReducer = (state={  }, action) =>{
         

    switch(action.type){

        case 'GET_SHIP_ORDER_REQ':
            return { loading:true,...state }
        case 'GET_SHIP_ORDER_SUCCESS':
            return { loading:false} 
        case 'GET_SHIP_ORDER_FAILED':
            return { loading:false}
            
        default: return state
    }

}
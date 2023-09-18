import jwt_decode from "jwt-decode"
const initialstate={
    token:JSON.parse(localStorage.getItem('token'))||null,
    user:localStorage.getItem('token')?jwt_decode(JSON.parse(localStorage.getItem('token')).access).username:null
}

const Reducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'SET_TOKEN':
            return {...state,token:action.payload.token,user:action.payload.user}
        case 'UPDATE_TOKEN':
            return {...state,token:action.payload.token,user:action.payload.user}
        default:
            return state
    }
}

export default Reducer

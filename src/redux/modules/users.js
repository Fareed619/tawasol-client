import { api, setAuthToken } from "../../utils";
import {showAlertMessage} from './alerts'





// what are the actions we have

const REGISTER_SUCCESS = "users/REGISTER_SUCCESS";
const REGISTER_FAIL = "users/REGISTER_FAIL";

const USER_LOADED = "users/USER_LOADED";
const USER_ERROR = "users/USER_ERROR";


const LOGIN_SUCCESS = "users/LOGIN_SUCCESS";
const LOGIN_FAIL = 'users/LOGIN_FAIL'
const LOGOUT = 'users/LOGOUT';


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGF5b…QwOH0.R7HdIQr9tXAcQDEIHlGiHbcDghKSMOCa9PntFsKV0C4
// actions creator 

export const login = (email, password) => async (dispatch) => {
   

    try{
        const res = await api.post("/users/login", {email, password});
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser())

        





    }catch(error){
        const errors = error.response.data.errors ;
        if(errors){
            errors.forEach(error => {
                dispatch(showAlertMessage(error.msg))
            })
        }

        dispatch({
            type:LOGIN_FAIL,
        })



    }

};


export const logOut = () => (dispatch) => {
    dispatch({
        type:LOGOUT
    })
    dispatch(showAlertMessage("You Logged out successfuly"))
}






export const loadUser =  () => async (dispatch) => {

    try{
        const res = await api.get("/users" );
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
      

    }catch(error){
        dispatch({
            type: USER_ERROR,
            
        })

    }

}

export  function register(formData){
    return async function registerThunk(dispatch){
        try{
            // call API /users/register

            const res = await api.post("/users/register",formData);
            console.log(res.data)
            dispatch({
                type: REGISTER_SUCCESS ,
                payload: res.data
            })
            dispatch(loadUser())

        }catch(error){
            console.log(error)

            const errors = error.response.data.errors ;
            if(errors){
                errors.forEach(error => {
                    dispatch(showAlertMessage(error.msg))
                })
            }

            dispatch({
                type: REGISTER_FAIL,
            })
        }

    }
};


// reducer

const initialState = {
    token: localStorage.getItem("token") ,
    isAuthenticated: null,
    loading: true,
    user: null


}

export default function reducer(state = initialState, action){
    const {type, payload} = action ; 
    switch(type){
        case USER_LOADED :
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload

            };
        
       
       
      

        case REGISTER_SUCCESS :
        case LOGIN_SUCCESS :   
            setAuthToken(payload.token)
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL: 
        case LOGIN_FAIL : 
            setAuthToken()
            
            return {
                ...state,
                isAuthenticated: false,
                laoding: false,
                token: null,

            }    
        case USER_ERROR :
        case LOGOUT:     
            setAuthToken()

            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null

            };
        default:
            return state    
    }

}
import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth } from './firebase';
import { provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

const Login = () => {
    const [ {}, dispatch ] = useStateValue();
    
    const signIn = () => [
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user, 
            })
        })
        .catch((error) => alert(error.message))
    ]
    

    return (
        <div className='login'>
            <h1> Login </h1>

            <div className='login__container'>
                <img src='https://www.pngitem.com/pimgs/m/505-5050969_transparent-transparent-background-whatsapp-logo-hd-png-download.png' alt='' />
                <div className='login__text'>
                    <h1> Sign in to WhatsApp </h1>
                </div>

                <Button  onClick={signIn}>
                Sign In With Google
            </Button>
            </div>
        </div>
    )
}

export default Login

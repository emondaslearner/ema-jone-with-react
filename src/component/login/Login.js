import React, { useContext, useState } from 'react';
import './Login.css';
import { theme } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { signInGoogle,initialize,signInFacebook,signUp,signIn } from './LoginFirebase';

const Login = () => {
    //set user
    const [loginUser,setLoginUser] = useContext(theme);
    const [user,setUser] = useState({
        name:'',
        password:'',
        email:''
    })


    // redirect when login success
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    //initialize the app
    initialize();

    //when request will not success
    const [isValid,setIsValid] = useState('');

    //when success
    const [success,setSuccess] = useState('');

    //if any input empty then state will set
    const [email,setEmail] = useState([]);
    const [password,setPassword] = useState([]);

    //sign in with google
    const signInWithGoogle = () =>{
        signInGoogle()
        .then(res => {
            setLoginUser(res.user);
            setSuccess('You have been resister successfully');
            history.replace(from);
        })
        .catch(error => {
            const errorMessage = error.message;
            setSuccess('You have been resister successfully');
            setIsValid(errorMessage);
        })
    }


    //sign in with facebook
    const signInWithFacebook = () => {
        signInFacebook()
        .then(res => {
            setLoginUser(res.user);
            history.replace(from);
        })
        .catch(error => {
            const errorMessage = error.message;
            setIsValid('facebook email already exist');
        })
    }

    //get the input by function
    const getElement = names => {
        const elements = document.querySelector('.'+names);
        return elements;
    }

    //check sign in or sign up
    const [isSignIn,setIsSignIn] = useState(false);
    const changeStatus = () => {
        if(isSignIn){
            setIsSignIn(false);
        }else{
            setIsSignIn(true);
        }
    }

    //submit the form
    const signUpTo = (e) => {
        e.preventDefault();


        //if any input will empty
        if(getElement('email').value == ''){
            setEmail('Email is empty');
        }else{
            setEmail(' ');
        }
        if(getElement('password').value == ''){
            setPassword('Password is empty');
        }else{
            setPassword(' ');
        }     
        
        //sign up the user
        if(isSignIn){
            signUp(user.name,user.email,user.password)
            .then(res => {
                setLoginUser(res.user);
                setSuccess('You have been resister successfully');
                history.replace(from);
            })
            .catch(error => {
                const errorMessage = error.message;
                setIsValid(errorMessage);
            })
        }
        //sign in the user
        else{
            signIn(user.email,user.password)
            .then(res => {
                setLoginUser(res.user);
                setSuccess('You have been resister successfully');
                history.replace(from);
            })
            .catch(error => {
                const errorMessage = error.message;
                setIsValid(errorMessage);
            })
        }
        
    } 
    

    //check information is valid 
    const handleBlur = (e) => {
        let isValid = true;
        e.preventDefault();
        if(e.target.name == 'email'){
            const emailVal = /\S+@\S+\.\S+/;
            isValid = emailVal.test(e.target.value);
        }
        if(e.target.name == 'password'){
            const passVal = /(?=.*[A-Z])(?=.*\d)/;
            isValid = passVal.test(e.target.value);
        }
        if(isValid){
            const caseValue = {...user};
            caseValue[e.target.name] = e.target.value;
            setUser(caseValue);
        }else{
            setIsValid('Information is not valid');
        }
        
    }

    

   

   
    
    return (
        <div className="main-login">
            <form action="">
                <h3>Enter needed information</h3>
                <input onClick={changeStatus} className="check" type="checkbox"/>
                <label htmlFor="">Create new account</label>
                {
                    isSignIn && <input onBlur={handleBlur} type="text"class="first" name="name" placeholder="Enter your name"/>
                }
                <p> </p>
                <input type="email" onBlur={handleBlur} class="email" name="email" placeholder="Enter your email" />
                {
                    email && <p className="p">{email}</p>
                }
                <input type="password" onBlur={handleBlur} class="password" name="password" placeholder="Enter password" />
                <label className="label" htmlFor="">password must have uppercase and number</label>
                {
                    password && <p className="p">{password}</p>
                }
                <input className="button" onClick={signUpTo} type="submit" value={isSignIn ? 'Sign up':'Sign in'} />
                <input onClick={signInWithGoogle} value="Sign up with google" className="button"/>
                <input onClick={signInWithFacebook} className="button" value="Sign up with facebook"/>
                {
                    success ? <p className="p" style={{color:'green'}}>{success}</p> : <p className="p">{isValid}</p>}
            </form>
        </div>
    );
};

export default Login;
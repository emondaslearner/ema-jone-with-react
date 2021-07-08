import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css'
import firebaseConfig from '../firebaseConfig/firebase.config';
import { theme } from '../../App';
import { useHistory, useLocation } from 'react-router';

firebase.initializeApp(firebaseConfig);
const Login = () => {
    const [loginUser,setLoginUser] = useContext(theme);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    
    //get the input by function
    const getElement = names => {
        const elements = document.querySelector('.'+names);
        return elements;
    }

    //if any input empty then state will set
    const [email,setEmail] = useState([]);
    const [password,setPassword] = useState([]);
    
    //if the information is valid
    const [isValid,setIsValid] = useState('');

    //success
    const [success,setSuccess] = useState('');

    //user in formation
    const [user,setUser] = useState({
        name:'',
        password:'',
        email:''
    })
    //change user status
    const [isSignIn,setIsSignIn] = useState(false);
    const changeStatus = () => {
        if(isSignIn){
            setIsSignIn(false);
        }else{
            setIsSignIn(true);
        }
    }

    //submit the form
    const signUp = (e) => {
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
        
        if(isSignIn){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                var users = userCredential.user;
                updateName(user.name)
                setSuccess('You have been resister successfully');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorMessage != ''){
                    setIsValid(errorMessage);
                }
            });
        }else{
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                var users = userCredential.user;
                setSuccess('You have been sign in successfully');
                setLoginUser(users.email);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
             });
        }
        
    } 
    //updateUser
    const updateName = (name) => {
        const userName = firebase.auth().currentUser;
        userName.updateProfile({
          displayName: name,
        })
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        }); 
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

    //sign in with google
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(providerGoogle)
        .then(function(result) {
          }).catch(function(error) {
          })
    }

    //sing in with facebook
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    const signInWithFacebook = () => {
        firebase
        .auth()
        .signInWithPopup(providerFacebook)
        .then((result) => {
        })
        .catch((error) => {
        });
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
                <input className="button" onClick={signUp} type="submit" value={isSignIn ? 'Sign up':'Sign in'} />
                <input onClick={signInWithGoogle} value="Sign up with google" className="button"/>
                <input onClick={signInWithFacebook} className="button" value="Sign up with facebook"/>
                {
                    success ? <p className="p" style={{color:'green'}}>{success}</p> : <p className="p">{isValid}</p>}
            </form>
        </div>
    );
};

export default Login;
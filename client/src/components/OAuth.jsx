import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const OAuth = () => {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleCLick = async() => {

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt : 'select_account' });

        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            // console.log(resultsFromGoogle);
            const res = await fetch('/api/auth/google',{
                method : 'POST',
                headers : { 'Content-Type' : 'application/json' },
                body : JSON.stringify({
                    name : resultsFromGoogle.user.displayName,
                    email : resultsFromGoogle.user.email,
                    googlePhotoUrl : resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate("/");
              }
            
        }
        catch(error){
            dispatch(signInFailure(data)); 
            console.log('Error : OAuth.jsx : Error Authenticating Via Google Account. : ', error );
        }

    }


  return (
    <Button type='button' gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleCLick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )
}

export default OAuth

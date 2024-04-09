import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const SignIn = () => {

  const [formData, setFormData ] = useState({});
  const { loading, error : errorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // dispatch(signInSuccess)


  const handleChange =(e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value.trim() });
  }
  // console.log('formData : ', formData);

  const handleSubmit = async(e) => {

    e.preventDefault();
    if( !formData.password || !formData.email ){
      return dispatch(signInFailure("please fill out all fields."))
     }
    try{
      dispatch(signInStart());
      const res = await fetch('./api/auth/signin', {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      // console.log('res data : ', res ,' res.success', res.ok);
      if(data.success === false) dispatch(signInFailure(data.message));

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/");
      }
    }
    catch(err){
      // console.log('Error : /signin.jsx : ', err.message );
      dispatch(signInFailure(data.message));
    }
  }


  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* { left side  } */}
        <div className="flex-1">
          <Link to={'/'} className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Tech</span>
          Blog
        </Link>

        <p className='text-sm mt-5'>This is a demo project. you can sign in with your email and password or with Google.</p> 
        </div>
        {/* { right side  } */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={ handleSubmit }>
            <div>
              <Label value='Your email'  />
              <TextInput
                type='email' placeholder='user@gmail.com' id='email' onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password'  />
              <TextInput
                type='password' placeholder='********' id='password' onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone={'purpleToPink'} type='submit' disabled={loading} >
              {
                loading ? (
                  <>
                    <Spinner size={'sm'} />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In' 
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have and account ?</span>
            <Link to={'/sign-up'}> Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5 ' color={'failure'}>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}


export default SignIn

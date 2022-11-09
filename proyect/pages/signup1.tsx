
import { Button, Grid, TextField } from '@material-ui/core';
import React, {useEffect, useRef, FormEventHandler, useState } from 'react';
import LayoutAuthSignup from '../components/Auth/LayoutAuthSignup';
import {useRouter} from 'next/router'
import User from '../namespaces/User';
import { Alert } from '@mui/material'
import decodeJwt from 'jwt-decode'
import {isAuthenticated} from '../utils/aut' 



function signup() {

  const passwordRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLFormElement>();
  const passwordConfirmationRef= useRef<HTMLFormElement>();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [userInit, setuserInit] = useState<User.SignupDescription>({
    email: '',
    password: '',
    passwordConfirmation:'',
  });


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

    e.preventDefault();
    console.log(passwordRef.current?.value, passwordConfirmationRef.current?.value);

    if(passwordRef.current?.value !== passwordConfirmationRef.current?.value){
      setError("Passwords do not match");
      return
      }
      
    try {

      setLoading(true);
      const keys = Object.keys(userInit) as Array<
        keyof User.SignupDescription>;
      console.log(keys);
      let valid = true;

      keys.forEach((key) => {
        if (key !== 'email' && key !== 'password' && key !== 'passwordConfirmation'&& userInit[key] === '')
          valid = false;
      })

      if (!valid) {
        console.log('Not Filled Correctly');
        setError('Error, must fill correctly form')
        setLoading(false);
        return;
      }

      const form_data = new FormData();
      form_data.append('username',emailRef.current?.value)
      form_data.append('password',passwordRef.current?.value)

      console.log(form_data.get('username') ,form_data.get('password'));
      const request = new Request('http://localhost:8000/api/signup', {

          method:'POST',
          body:form_data,
        });


      if (form_data) {
        const response = await fetch(request)
        if(response.status === 500){
            throw new Error ('Internal Server error')
          }
        const data = await response.json();
        if(response.status > 400 && response.status < 500){
            if(data.detail){
                throw data.detail;
              }
          }
        if('access_token' in data){
            const decodeToken:any = decodeJwt(data['access_token']);
            localStorage.setItem('token',data['access_token'])
            localStorage.setItem('permissions',decodeToken.permissions)
            localStorage.setItem('id',decodeToken.id)
            setUserId(decodeToken.id)
            console.log(decodeToken.id)
          }

      }
    } catch (e: any) {
      console.log(e);
      setError("Error while POST")
      setLoading(false)
    }
  }

  useEffect(() =>{
    if(isAuthenticated() && userId !==''){
       router.push(`main_home`);
    }
      
    },[userId])
  const formStyle = {
    // padding: 20,
    // margin: '10px auto',
    //     marginLeft: '50px',
    marginTop: '20px ',
  };

  return (
      <>
      <LayoutAuthSignup submitForm={handleSubmit}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>
              {error}
            </Alert>

          </Grid>
        )}
          <Grid item xs={12}>
            <TextField
              label='Email'
              variant='filled'
              placeholder='Enter Email'
              fullWidth
              inputRef={emailRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              variant='filled'
              type='password'
              placeholder='Enter Password'
              fullWidth
              inputRef={passwordRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Company Name'
              //       variant='outlined'
              variant='filled'
              placeholder='Confirm Password'
              fullWidth
              inputRef={passwordConfirmationRef}
            />
          </Grid>
        <Grid container spacing={6} style={formStyle}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutAuthSignup>
    </>
 ); 
}

export default signup;

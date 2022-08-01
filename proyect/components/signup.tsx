import { Button, Grid, TextField } from '@material-ui/core';
import React, { useRef, FormEventHandler, useState } from 'react';
import LayoutAuthSignup from '../components/Auth/LayoutAuthSignup';
import User from '../namespaces/User';
import { Alert } from '@mui/material'
import {isInfoComplete} from '../utils/aut'
import router from 'next/router';




const SignupComponent: React.FC = () => {

  const [userInfo, setuserInfo] = useState<User.Description>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cellphone: 0,
    companyname: '',
  });
  const [error, setError] = useState<String | null>(null);
  const passwordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState<boolean>(false);
  

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);
      if (userInfo.password) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        const dataObj  = {
            'username': userInfo.username,
            'firstname': userInfo.firstname,
            'lastname': userInfo.lastname,
            'email': userInfo.email,
            'password': userInfo.password,
            'cellphone': userInfo.cellphone?.toString(),
            'companyname': userInfo.companyname,
          }
        const requestOptions = {
          method: 'PUT',
          headers: {
            'accept':'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataObj)
        }
        console.log(requestOptions) 
        const ressponse = await fetch(`http://localhost:8000/api/v1/users/${userId}`, requestOptions)
          .then((res) => {
            res.json()
              .then((data) => {
                if(isInfoComplete(data)){
                  if(data.is_active && data.is_superuser)
                    router.push(`/users/${userId}`)
                  else if (data.is_active && data.is_leader) 
                    router.push(`/users/${userId}`)
                  else
                    router.push(`/costumer/${userId}`)
                  }
              })
          }).catch((error) => {
            console.log(error)
          })
      }
    } catch (e: any) {
      console.log(e);
      setError("Error while POST")
      setLoading(false)
    }

  }

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
        <Grid container spacing={3} style={formStyle}>
          <Grid item xs={12}>
            <TextField
              label='Username'
              variant='filled'
              placeholder='Enter Username'
              fullWidth
              onChange={(e) => {
                userInfo.username = e.target.value;
                setuserInfo(userInfo);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Firstname'
              variant='filled'
              placeholder='Enter First Name'
              fullWidth
              onChange={(e) => {
                userInfo.firstname = e.target.value;
                setuserInfo(userInfo);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Lastname'
              variant='filled'
              placeholder='Enter Last Name'
              fullWidth
              onChange={(e) => {
                userInfo.lastname = e.target.value;
                setuserInfo(userInfo);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              variant='filled'
              placeholder='Enter Email'
              fullWidth
              onChange={(e) => {
                userInfo.email = e.target.value;
                setuserInfo(userInfo);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              variant='filled'
              type='password'
              placeholder='Enter Password'
              fullWidth
              onChange={(e) => {
                userInfo.password = e.target.value;
                setuserInfo(userInfo);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Company Name'
              //       variant='outlined'
              variant='filled'
              placeholder='Enter Company Name'
              fullWidth
              onChange={(e) => {
                userInfo.companyname = e.target.value;
                setuserInfo(userInfo);
              }}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Cellphone Number'
              //       variant='outlined'
              variant='filled'
              placeholder='Enter Cellphone'
              fullWidth
              onChange={(e) => {
                userInfo.cellphone = Number(e.target.value);
                setuserInfo(userInfo);
              }}
            />
          </Grid>
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

export default SignupComponent;

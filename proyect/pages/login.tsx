import decodeJwt from 'jwt-decode'
import {
  Grid,
  makeStyles,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, FormEventHandler, useRef, useState } from 'react';
import LayoutAuth from '../components/Auth/LayoutAuth';
import { useRouter } from 'next/router'
import { isAuthenticated,isValidToken } from '../utils/aut';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg,	#00008B 60%,#B0C4DE 90% )',
    borderRadius: 3,
    border: 0,
    color: 'white',
    // height: 35,
    // width: 150,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'capitalize',
  },
});

function Login() {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState({
    checkedA: false,
  });
  const [userId, setUserId] = useState<null | string>(null);
  const [email, setEmail] = useState();
  const passwordRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles();
  const textStyle = {
    // padding: 20,
    margin: '5px auto',
  };
  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('Form Submited');
    try {
      setError(null);
      setLoading(true);
      console.log(passwordRef.current?.value, emailRef.current?.value);

      if (passwordRef.current?.value && emailRef.current?.value) {
        const formData = new FormData();
        // OAuth expects for mdata , not JSON data
        formData.append('username', emailRef.current.value);
        formData.append('password', passwordRef.current.value);

        const request = new Request('http://localhost:8000/api/token', {
          method: "POST",
          body: formData,
        })
        if (formData) {
          const response = await fetch(request)
          if (response.status === 500) {
            throw new Error('Internal Server error')
          }
          const data = await response.json();
          if (response.status > 400 && response.status < 500) {
            if (data.detail) {
              throw data.detail;
            }
          }
          if ('access_token' in data) {
            const decodeToken: any = decodeJwt(data['access_token']);
            localStorage.setItem('token', data['access_token'])
            localStorage.setItem('permissions', decodeToken.permissions)
            localStorage.setItem('id', decodeToken.id)
            setUserId(decodeToken.id);
          }
          console.log(data);
        }
        else {
          setError('Form must be filled correctly');
          return;
        }
      }
    }
    catch (e: any) {
      console.log(e);
      setError("Error in Login");
    }
  };


  const handlerChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };
  console.log("Loading value =>" + loading);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isAuthenticated() && isValidToken(token?token:"")) {
      console.log("Authenticated")
      router.push(`/main_home`);
    }
  }, [userId]);

  return (
    <>
      <LayoutAuth submitProps={submitHandler}>
        {error && (
          <Grid>
            <Alert severity='error'>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            label='Username'
            placeholder='Enter Username'
            fullWidth
            required
            style={textStyle}
            inputRef={emailRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Password'
            placeholder='Enter Password'
            type='password'
            fullWidth
            required
            style={textStyle}
            inputRef={passwordRef}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={2}>
            <Checkbox
              checked={checked.checkedA}
              onChange={handlerChangeCheck}
              name='checkedA'
              color='primary'
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant='body2'
              // noWrap
              align='left'
              style={{ marginTop: '12px' }}
            >
              Remember Me?
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align='center' style={{ marginTop: '10px' }}>
              <Link color='primary' href='/signup'>
                <b>Sign Up</b>
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Button
              classes={{
                root: classes.root,
                label: classes.label,
              }}
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              disabled={loading}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </LayoutAuth>
    </>
  );
}

export default Login;


import { Button, Grid, TextField } from '@material-ui/core';
import React, { useRef, FormEventHandler, useState, useContext } from 'react';
import LayoutAuthSignup from '../components/Auth/LayoutAuthSignup';
import User from '../namespaces/User';
import { Alert } from '@mui/material'
import {isProjectInfoComplete} from '../utils/aut'
import {ProjectContext, IContext} from '../pages/users/[id]/index'




const Signup_ProjectComponent: React.FC = () => {
  const {setOpen} = useContext(ProjectContext) as IContext
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const projectNameRef= useRef<HTMLInputElement>();
  const nameOfLeaderRef= useRef<HTMLInputElement>();
  const descriptionRef= useRef<HTMLInputElement>();
     
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (projectNameRef.current?.value  ) {
        const token = localStorage.getItem('token');
        const dateNow = new Date().toISOString();
        console.log(dateNow)
        const projectToBePosted= {
            'projectName': projectNameRef.current?.value, 
            'nameOfLeader': nameOfLeaderRef.current?.value,
            'description': descriptionRef.current?.value,
            'createdAtTime':dateNow,
          }
        const requestOptions = {
          method: 'POST',
          headers: {
            'accept':'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectToBePosted)
        }
        console.log(requestOptions) 
        const response = await fetch(`http://localhost:8000/api/v1/projects`, requestOptions)
          .then((res) => {
            res.json()
              .then((data) => {
                if(isProjectInfoComplete(data)){
                    console.log(data);
                    setOpen?setOpen(false):null;
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
              label='NameOfProject'
              variant='filled'
              placeholder='Enter Name of Project'
              fullWidth
              inputRef={projectNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Name of Leader'
              variant='filled'
              placeholder='Enter Name of Leader'
              fullWidth
              inputRef={nameOfLeaderRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              variant='filled'
              placeholder='Enter Description'
              fullWidth
              inputRef={descriptionRef}
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

export default Signup_ProjectComponent;


import { Button, Grid, TextField } from '@material-ui/core';
import React, { useRef, FormEventHandler, useState, useContext, useEffect } from 'react';
import LayoutAuthSignup from '../Auth/LayoutAuthSignup';
import Ingredient from '../../namespaces/User';
import { Alert } from '@mui/material'
// import {isProjectInfoComplete} from '../utils/aut'
import {Project_Page_Ctx, IContextProject} from '../../pages/users/[id]/projects/[projectid]/index'
//


const Post_Ingredient: React.FC = () => {

  const {projectId} = useContext(Project_Page_Ctx) as IContextProject
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const ingredientNameRef= useRef<HTMLInputElement>();
  const quantityRef= useRef<HTMLInputElement>();
  const unitRef= useRef<HTMLInputElement>();
  const urlStringRef= useRef<HTMLInputElement>();
  const descriptionRef= useRef<HTMLInputElement>();
     
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      
      setLoading(true);
      if (ingredientNameRef.current?.value  && quantityRef.current?.value ) {
        const token = localStorage.getItem('token');
        const dateNow = new Date().toISOString();
        console.log(dateNow)
        const ingredient= {
            'nameIngredient': ingredientNameRef.current?.value,
            'quantity': quantityRef.current?.value,
            'unit': unitRef.current?.value,
            'summary': descriptionRef.current?.value,
            'image_url': urlStringRef.current?.value,
            'createdAtTime':dateNow,
          }
        const requestOptions = {
          method: 'POST',
          headers: {
            'accept':'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient)
        }
        console.log(requestOptions)
        const response = projectId? await fetch(`http://localhost:8000/api/v1/ingredients/${projectId}`, requestOptions)
          .then((res) => {
            res.json()
              .then((data) => {

                // if(isProjectInfoComplete(data)){
                    console.log(data);
                //     setOpen?setOpen(false):null;
                //   }
              })
          }).catch((error) => {
            console.log(error)
          }):null
      }
    } catch (e: any) {
      console.log(e);
      setError("Error while POST")
      setLoading(false)
    }
  }
  console.log("Project Id  Post ===> "+projectId)
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
              label='Ingredient Name'
              variant='filled'
              placeholder='Enter Name of Ingredient'
              fullWidth
              inputRef={ingredientNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Quantity'
              variant='filled'
              placeholder='Enter Name of Leader'
              fullWidth
              inputRef={quantityRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Path Image'
              variant='filled'
              placeholder='Enter Path Image '
              fullWidth
              inputRef={urlStringRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Unit'
              variant='filled'
              placeholder='Enter Unit of Ingredient'
              fullWidth
              inputRef={unitRef}
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

export default Post_Ingredient;

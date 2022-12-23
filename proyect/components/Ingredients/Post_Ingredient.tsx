
import { Button, Grid, TextField } from '@material-ui/core';
import React, { useRef, FormEventHandler, useState, useContext, useEffect } from 'react';
import LayoutEditIngredient from '../Auth/LayoutEditIngredient';
import Ingredient from '../../namespaces/User';
import { Alert } from '@mui/material'
import { Project_Page_Ctx} from '../../pages/users/[id]/projects/[projectid]/index'
import  IContextProject  from '../../namespaces/Ingredients_Page_States'
import { Dispatch, SetStateAction } from 'react'


const Post_Ingredient: React.FC = () => {

  const { projectId, setOpenIngredient } = useContext(Project_Page_Ctx) as IContextProject
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const ingredientNameRef = useRef<HTMLInputElement>();
  const quantityRef = useRef<HTMLInputElement>();
  const unitRef = useRef<HTMLInputElement>();
  const urlStringRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      if (ingredientNameRef.current?.value && quantityRef.current?.value) {
        const token = localStorage.getItem('token');
        const dateNow = new Date().toISOString();
        console.log(dateNow)
        const ingredient = {
          'nameIngredient': ingredientNameRef.current?.value,
          'quantity': quantityRef.current?.value,
          'unit': unitRef.current?.value,
          'summary': descriptionRef.current?.value,
          'image_url': urlStringRef.current?.value,
          'createdAtTime': dateNow,
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient)
        }
        console.log(requestOptions)
        const response = projectId ? await fetch(`http://localhost:8000/api/v1/ingredients/${projectId}`, requestOptions) : null
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json()
        setOpenIngredient(false)
        console.log(data);
      }
      else {
      setError("Incorrectly filled")
      }
    } catch (e: any) {
      console.log(e);
      setError("Error while POST")
      setLoading(false)
    }
  }
  console.log("Project Id  Post ===> " + projectId)
  const formStyle = {
    // padding: 20,
    // margin: '10px auto',
    //     marginLeft: '50px',
    marginTop: '20px ',
  };
  return (
    <>
      <LayoutEditIngredient nameForm={'New Ingredient'} submitForm={handleSubmit}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>{error}</Alert>
          </Grid>
        )}

        <Grid container spacing={1} style={formStyle}>
          <Grid item xs={12}>
            <TextField
              label='Item Name'
              variant='outlined'
              placeholder='Enter Name of Item'
              fullWidth
              size='small'
              inputRef={ingredientNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Type of Item'
              variant='outlined'
              placeholder='Enter Type of Item'
              fullWidth
              size='small'
              inputRef={unitRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Price'
              variant='outlined'
              placeholder='Enter Price'
              fullWidth
              size='small'
              inputRef={quantityRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Image Url'
              variant='outlined'
              placeholder='Enter Url or Path Image '
              fullWidth
              size='small'
              inputRef={urlStringRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Description'
              variant='outlined'
              placeholder='Enter Description'
              fullWidth
              multiline
              rows={5}
              size='small'
              inputRef={descriptionRef}
            />
          </Grid>
        </Grid>

        <Grid container style={{marginTop:'40px'}}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutEditIngredient>
    </>
  );
}

export default Post_Ingredient;

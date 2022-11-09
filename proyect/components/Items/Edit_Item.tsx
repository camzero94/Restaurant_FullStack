
import { Button, Grid, TextField, IconButton } from '@material-ui/core';
import React, { useRef, FormEventHandler, useState, useContext, useEffect } from 'react';
import LayoutEdit from '../Auth/LayoutEditIngredient';
import Ingredient from '../../namespaces/User';
import { Alert } from '@mui/material'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


const Edit_Item: React.FC = () => {
  const { projectId, setOpenEditIngredient, idDeleteIngredient, ingredientArray } = useContext(Project_Page_Ctx) as IContextProject

  const [editIngredientFlagName, setEditIngredientFlagName] = useState<boolean>(true)
  const [editIngredientFlagQty, setEditIngredientFlagQty] = useState<boolean>(true)
  const [editIngredientFlagPath, setEditIngredientFlagPath] = useState<boolean>(true)
  const [editIngredientFlagUnit, setEditIngredientFlagUnit] = useState<boolean>(true)
  const [editIngredientFlagDescription, setEditIngredientFlagDescription] = useState<boolean>(true)

  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const editNameIngredientRef = useRef<HTMLInputElement>();
  const quantityRef = useRef<HTMLInputElement>();
  const unitRef = useRef<HTMLInputElement>();
  const urlStringRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const IngredientToEdit = ingredientArray.find(val => val.ingredientId === idDeleteIngredient)



  // Handle Edit Ingredients Attributes 
  const handelClickEditIngredientName = () => {
    setEditIngredientFlagName(false)
  }

  const handelClickEditIngredientQty = ()=>{
    setEditIngredientFlagQty(false)
    }
  const handelClickEditIngredientPath = ()=>{
    setEditIngredientFlagPath(false)
    }

  const handelClickEditIngredientUnit = ()=>{
    setEditIngredientFlagUnit(false)
    }

  const handelClickEditIngredientDescription = ()=>{
    setEditIngredientFlagDescription(false)
    }


  const stopProp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }
  //Handle Submit Form
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true);
      if (editNameIngredientRef.current?.value && quantityRef.current?.value) {
        const token = localStorage.getItem('token');
        const dateNow = new Date().toISOString();
        console.log(dateNow)
        const ingredient = {
          'nameIngredient': editNameIngredientRef.current?.value,
          'quantity': quantityRef.current?.value,
          'unit': unitRef.current?.value,
          'summary': descriptionRef.current?.value,
          'image_url': urlStringRef.current?.value,
          'updatedAtTime': dateNow,
        }
        const requestOptions = {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient)
        }
        console.log(requestOptions)
        const response = projectId ? await fetch(`http://localhost:8000/api/v1/ingredients/${idDeleteIngredient}`, requestOptions) : null
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json()
        setOpenEditIngredient(false)
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

  // console.log("Project Id  Post ===> " + projectId)
  // console.log("Ingredient Id===> " + idDeleteIngredient)
  // console.log("Array Founded",ingredientArray.find(val => val.ingredientId === idDeleteIngredient)) 

const paperStyle = {
  padding: 20,
  height:  '65vh',
  width: 500,
  margin: '25px auto',
  borderRadius: 20,
};
  return (
    <>
      <Grid container style={paperStyle}>
        {error && (
          <Grid item xs={12}>
            <Alert severity='error'>
              {error}
            </Alert>

          </Grid>
        )}
      </Grid>
    </>
  );
}

        // <Grid container spacing={1} style={formStyle}>
        //   <Grid item xs={10}>
        //     <TextField
        //       label='Name Ingredient'
        //       variant='outlined'
        //       placeholder='Enter Name of Ingredient'
        //       disabled={editIngredientFlagName}
        //       onKeyDown={stopProp}
        //       defaultValue={IngredientToEdit.nameIngredient}
        //       fullWidth
        //       size='small'
        //       inputRef={editNameIngredientRef}
        //     />
        //   </Grid>
        //   <Grid item xs={2} style={formStyle.button}>
        //     <IconButton
        //       aria-label="customize-button"
        //       size='small'
        //       onClick={handelClickEditIngredientName}>
        //       <EditTwoToneIcon />
        //     </IconButton>
        //   </Grid>
        //   <Grid item xs={10}>
        //     <TextField
        //       label='Quantity'
        //       variant='outlined'
        //       placeholder='Enter Name of Leader'
        //       disabled={editIngredientFlagQty}
        //       onKeyDown={stopProp}
        //       defaultValue={IngredientToEdit.quantity}
        //       fullWidth
        //       size='small'
        //       inputRef={quantityRef}
        //     />
        //   </Grid>
        //   <Grid item xs={2} style={formStyle.button}>
        //     <IconButton
        //       aria-label="customize-button"
        //       size='small'
        //       onClick={handelClickEditIngredientQty}>
        //       <EditTwoToneIcon />
        //     </IconButton>
        //   </Grid>
        //   <Grid item xs={10}>
        //     <TextField
        //       label='Path Image'
        //       variant='outlined'
        //       placeholder='Enter Path Image '
        //       disabled={editIngredientFlagPath}
        //       onKeyDown={stopProp}
        //       defaultValue={IngredientToEdit.image_url}
        //       fullWidth
        //       size='small'
        //       inputRef={urlStringRef}
        //     />
        //   </Grid>
        //   <Grid item xs={2} style={formStyle.button}>
        //     <IconButton
        //       aria-label="customize-button"
        //       size='small'
        //       onClick={handelClickEditIngredientPath}>
        //       <EditTwoToneIcon />
        //     </IconButton>
        //   </Grid>
        //   <Grid item xs={10}>
        //     <TextField
        //       label='Unit'
        //       variant='outlined'
        //       placeholder='Enter Unit of Ingredient'
        //       disabled={editIngredientFlagUnit}
        //       onKeyDown={stopProp}
        //       defaultValue={IngredientToEdit.unit}
        //       fullWidth
        //       size='small'
        //       inputRef={unitRef}
        //     />
        //   </Grid>
        //   <Grid item xs={2} style={formStyle.button}>
        //     <IconButton
        //       aria-label="customize-button"
        //       size='small'
        //       onClick={handelClickEditIngredientUnit}>
        //       <EditTwoToneIcon />
        //     </IconButton>
        //   </Grid>
        //   <Grid item xs={10}>
        //     <TextField
        //       label='Description'
        //       disabled={editIngredientFlagDescription}
        //       variant='outlined'
        //       placeholder='Enter Description'
        //       onKeyDown={stopProp}
        //       defaultValue={IngredientToEdit.summary}
        //       fullWidth
        //       size='small'
        //       inputRef={descriptionRef}
        //     />
        //   </Grid>
        //   <Grid item xs={2} style={formStyle.button}>
        //     <IconButton
        //       aria-label="customize-button"
        //       size='small'
        //       onClick={handelClickEditIngredientDescription}>
        //       <EditTwoToneIcon />
        //     </IconButton>
        //   </Grid>
        // </Grid>
        // <Grid container spacing={6} style={formStyle}>
        //   <Grid item xs={12}>
        //     <Button variant='contained' fullWidth color='primary' type='submit'>
        //       Submit
        //     </Button>
        //   </Grid>
        // </Grid>
export default Edit_Item;

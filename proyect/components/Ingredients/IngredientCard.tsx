import { Typography, Card, Grid, Box, IconButton} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useContext, useEffect } from 'react'
import IngredientLogo from '../../public/ingredients.svg';
import Image from 'next/image'
import { Project_Page_Ctx} from '../../pages/users/[id]/projects/[projectid]/index'
import Ingredient  from '../../namespaces/Ingredient'
import {cardIngredient} from '../Styles'

interface props {
  ingredient?: Ingredient.Description;
  open?: boolean;
  setanchorEl?: React.Dispatch<React.SetStateAction<HTMLElement>>;
  setIdDeletedIngredient?:React.Dispatch<React.SetStateAction<any>>;
}

const IngredientCard: React.FC<props> = ({ingredient,setanchorEl,setIdDeletedIngredient}) => {

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    setanchorEl(e.currentTarget);
    setIdDeletedIngredient(ingredient.ingredientId);
    console.log("Clicked")
}

  return (
    <>
      <Grid container sx={cardIngredient.root}>
        <Card sx={cardIngredient.paper}>
          <Grid container direction="column" sx={cardIngredient.containerPaper}>
            <Box
              component="img"
              sx={cardIngredient.image}
              alt="Project Default Image"
              src="https://saverafresh.com/wp-content/uploads/2021/08/istockphoto-466175630-612x612-1.jpg"
            />
            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={11} >
                <Typography variant='subtitle1' style={{ display: 'flex', fontSize: '14px', fontWeight: 600, width: 200, justifyContent: 'center', maxWidth: 200 }} >
                {ingredient.nameIngredient}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={1} style={{ marginTop: 4 }} >
                <Image src={IngredientLogo} alt='ingredient logo' />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', marginBottom: 0, marginTop: 8, justifyContent: 'center' }}>
                <Typography align='left' variant='subtitle2'
                  style={{ color: '#737373', fontWeight: 400, fontSize: '10px' }}>
                  {`Quantity: ${ingredient.quantity}`}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ marginBottom: 0, marginTop: 8 }}>
                <Typography align='left' variant='subtitle2'
                  style={{ color: '#737373', fontWeight: 400, fontSize: '10px' }}>
                  {`Unit: ${ingredient.unit}`}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ marginBottom: 5 }}>
                <IconButton
                  aria-label="customize-button"
                  aria-controls={open ? 'style-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  size='small'
                  onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>

            </Grid>
          </Grid>
        </Card>
      </Grid >

    </>
  );
}

export default IngredientCard;

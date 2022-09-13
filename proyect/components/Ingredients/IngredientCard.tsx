import { Typography, Card, Grid, Box, IconButton, MenuItem } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useContext, useEffect } from 'react'
import IngredientLogo from '../../public/ingredients.svg';
import Icon from '@mui/material/Icon'
import Image from 'next/image'
import { Project_Page_Ctx, IContextProject } from '../../pages/users/[id]/projects/[projectid]/index'
import Ingredient  from '../../namespaces/Ingredient'

interface props {
  ingredient?: Ingredient.Description;
  open?: boolean;
  setanchorEl?: React.Dispatch<React.SetStateAction<HTMLElement>>
}

const cardIngredient = {
  root: {
    display: "flex",
    padding: 2,
    justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "maxWidth",
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height: 200
  },
  containerPaper: {
    alignItems: 'center',
  },
  image: {
    display: 'flex',
    maxHeight: 135,
    maxWidth: 261
  },

  containerText: {
    display: 'flex',
    width: "maxWidth",
  },
  logo: {
    width: 18,
    height: 18,
    // bgcolor: deepOrange[500],
  },
  button: {
  }
}

const IngredientCard: React.FC<props> = ({ingredient}) => {
  console.log("Ingredient:",ingredient)
  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {

  // const token = localStorage.getItem('token')
  // console.log(token)
  //
  // const request = {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   },
  // }
  //
  // const result = await fetch(`http://localhost:8000/api/v1/ingredient/${projectId.projectid}`, request)
  // const data = await result.json();
  // console.log(data)

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

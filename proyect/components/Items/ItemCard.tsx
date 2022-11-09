
import { Typography, Card, Grid, Box, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Chip from '@mui/material/Chip';
import { useState, useContext, useEffect } from 'react'
import ItemLogo from '../../public/Item.svg';
import Image from 'next/image'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import Item from '../../namespaces/Item'
import Ingredient from '../../namespaces/Ingredient'
import Recipe from '../../namespaces/Recipe'
import { cardItem } from '../Styles'

interface props {
  item?: Item.Description;
  open?: boolean;
  setanchorElItem?: React.Dispatch<React.SetStateAction<HTMLElement>>;
  setIdDeletedItem?: React.Dispatch<React.SetStateAction<any>>;
}

let ingredientsItemName: Ingredient.Description[] = []
const ItemCardComponent: React.FC<props> = ({ item, setanchorElItem, setIdDeletedItem}) => {

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    setanchorElItem(e.currentTarget);
    setIdDeletedItem(item.itemId);
  }

  const handleClickRecipe = async (e: React.MouseEvent<HTMLElement>) => {
    // item.ingredients.map((recipe) => {
    //   ingredientsItemName.push(recipe.ingredient.nameIngredient)
    // })
    //   console.log("Ingredietns Name",ingredientsItemName)

  }

  return (
    <>
      <Grid container sx={cardItem.root}>
        <Card sx={cardItem.paper}>
          <Grid container direction="column" sx={cardItem.containerPaper}>
            <Box
              component="img"
              sx={cardItem.image}
              alt="Project Default Image"
              src="https://saverafresh.com/wp-content/uploads/2021/08/istockphoto-466175630-612x612-1.jpg"
            />
            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={11} >
                <Typography variant='subtitle1' style={{ display: 'flex', fontSize: '14px', fontWeight: 600, width: 200, justifyContent: 'center', maxWidth: 200 }} >
                  {item.nameItem}
                </Typography>
              </Grid>
            </Grid>

            <Grid className={'Price'} container direction='row' style={cardItem.price}>
              <Grid item xs={1} >
                <Typography variant='body1' style={{ display: 'flex', fontSize: '16px', fontWeight: 600, justifyContent: 'right' }} >
                  $
                </Typography>
              </Grid>
              <Grid item xs={5} >
                <Typography variant='body1' style={{ display: 'flex', fontSize: '20px', fontWeight: 'bold', width: 200, justifyContent: 'left', maxWidth: 200 }} >
                  {`${item.price} Ntd`}
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={1} style={{ marginTop: 5 }} >
                <Image src={ItemLogo} alt='ingredient logo' />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', marginBottom: 0, marginTop: 8, justifyContent: 'center' }}>
                <Typography align='left' variant='subtitle2'
                  style={{ color: '#737373', fontWeight: 400, fontSize: '10px' }}>
                  {`Type: ${item.type}`}
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ marginBottom: 0, marginTop: 3 }}>
                <Chip
                  label='Recipe'
                  size='small'
                  style={{ borderRadius: 20, background: '#E1E0E0' }}
                  onClick={handleClickRecipe}
                />
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
            <Grid container spacing={1} direction='row' wrap='wrap' style={{ display: 'flex', padding: '0.5rem' }}>
              {
                item.ingredients.map((recipe, index) => {
                  if (index < 8) {
                    return (
                      <Grid item xs={3}>
                        <Chip
                          label={`${recipe.ingredient.nameIngredient}`}
                          size='small'
                          style={{ borderRadius: 20, background: '#E1E0E0' }}
                          onClick={handleClickRecipe}
                        />
                      </Grid>
                    )
                  }
                  else
                    return
                })
              }
              <Grid item xs={1}>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid >

    </>
  );
}

export default ItemCardComponent;

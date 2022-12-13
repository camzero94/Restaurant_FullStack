import { Typography, Card, Grid, Box, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Chip from '@mui/material/Chip'
import { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import Menu from '../../namespaces/Menu'
import Item from '../../namespaces/Item'
import MenuLogo from '../../public/Menu_Restaurant.svg'
import { cardMenu } from '../Styles'
import MenuItem from '../../namespaces/Menu_Item'
interface props {
  menu?: Menu.Description
  open?: boolean
  setanchorElMenu?: React.Dispatch<React.SetStateAction<HTMLElement>>
  setIdDeletedItem?: React.Dispatch<React.SetStateAction<any>>
}

const MenuCardComponent: React.FC<props> = ({ menu, setanchorElMenu }) => {
  console.log('Menu Array Menu Card', menu)

  const [randomArr,setRandomArr ] = useState<Number[]>([])

  const chooseFourRandom = (itemArr) => {

    let randomArrFour: Number[]= []
    //If Items length are grater than 4
    if (randomArrFour.length < 4) {
      for (let i=0; i < itemArr.length;i++){
        randomArrFour.push(i) 
        }
    } 
    else {
      while (randomArrFour.length <= 4) {
        let ranNumber = Math.floor(Math.random() * itemArr.length)
        console.log('Here NUmber ==========', ranNumber)
        if (randomArrFour.length === 0) {
          randomArrFour.push(ranNumber)
        } else if (!randomArrFour.includes(ranNumber)) {
          randomArrFour.push(ranNumber)
        }
      }
    }

    return randomArrFour
  }
  const arrRandom = async (arrItems:MenuItem.Description[])=>{
    let res = await chooseFourRandom(arrItems)
    setRandomArr(res)
  }

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    // setanchorElItem(e.currentTarget);
    // setIdDeletedItem(item.itemId);
  }

  const handleClickRecipe = async (e: React.MouseEvent<HTMLElement>) => {
    // item.ingredients.map((recipe) => {
    //   ingredientsItemName.push(recipe.ingredient.nameIngredient)
    // })
    //   console.log("Ingredietns Name",ingredientsItemName)
  }
  
  useEffect(() => {
    console.log("Enter Here ")
     arrRandom(menu.items)
  }, []) 
  
  return (
    <>
      <Grid container sx={cardMenu.root}>
        <Card sx={cardMenu.paper}>
          <Grid container direction='column' sx={cardMenu.containerPaper}>
            <Box
              component='img'
              sx={cardMenu.image}
              alt='Project Default Image'
              src='https://cdn.qlikcloud.com/qmfe/hub/2.0.603/135d8c2733c0247eceaa.svg'
            />

            <Grid container direction='row'>
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <Typography
                  variant='subtitle1'
                  style={{
                    display: 'flex',
                    fontSize: '14px',
                    fontWeight: 600,
                    width: 200,
                    justifyContent: 'center',
                    maxWidth: 200,
                  }}
                >
                  Name Menu
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction='row'>
              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ marginTop: 5 }}>
                <Image src={MenuLogo} alt='ingredient logo' />
              </Grid>

              <Grid
                item
                xs={8}
                style={{
                  display: 'flex',
                  marginBottom: 0,
                  marginTop: 3,
                  justifyContent: 'center',
                }}
              >
                <Chip
                  label='Description'
                  size='small'
                  style={{ borderRadius: 20, background: '#E1E0E0' }}
                  onClick={handleClickRecipe}
                />
              </Grid>

              <Grid item xs={2} style={{ marginBottom: 5 }}>
                <IconButton
                  aria-label='customize-button'
                  aria-controls={open ? 'style-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  size='small'
                  onClick={handleClick}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction='row'
              wrap='wrap'
              style={{ display: 'flex', padding: '0.5rem' }}
            >
              {menu.items.map((menuItem, index) => {
                if (randomArr.includes(index)) {
                  return (
                    <Grid item xs={3}>
                      <Chip
                        label={`${menuItem.item.type}`}
                        size='small'
                        style={{ borderRadius: 20, background: '#E1E0E0' }}
                        onClick={handleClickRecipe}
                      />
                    </Grid>
                  )
                } else return
              })}
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  )
}

export default MenuCardComponent

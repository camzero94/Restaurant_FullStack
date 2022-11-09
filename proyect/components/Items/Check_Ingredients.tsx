import {
  Box,
  Typography,
  Divider,
  InputAdornment,
  Paper,
  FormGroup,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  TextField,
  IconButton,
} from '@material-ui/core'
import React, {
  useRef,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react'
import LayoutEdit from '../Auth/LayoutEditIngredient'
import Ingredient from '../../namespaces/User'
import Recipe from '../../namespaces/Recipe'
import { Alert } from '@mui/material'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { quantityRecipe } from './PostItem'

interface propsCheckIngredients {
  setOpenModalAddDel?: React.Dispatch<React.SetStateAction<boolean>>
  setArraySelected?: React.Dispatch<React.SetStateAction<quantityRecipe[]>>
  arraySelected?: quantityRecipe[]
  setQuantity?: React.Dispatch<React.SetStateAction<quantityRecipe[]>>
  quantity?: quantityRecipe[]
  recipes?: Recipe.Description[]
  setRecipes?: React.Dispatch<React.SetStateAction<Recipe.Description[]>>
}

interface ingredientsTotal {
  ingredientId?: number
  nameIngredient?: string
}

const CheckIngredient: React.FC<propsCheckIngredients> = ({
  setRecipes,
  recipes,
  quantity,
  setQuantity,
  arraySelected,
  setArraySelected,
  setOpenModalAddDel,
}) => {
  let tempRecipeObj = {
    ingredientId: 0,
    nameIngredient: '',
    quantity: 0,
    summary: '',
    unit: '',
    image_url: '',
    createdAtTime: '',
  }

  const { ingredientArray } = useContext(Project_Page_Ctx) as IContextProject
  const [totalIngredients, setTotalIngredients] = useState<ingredientsTotal[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(false)

  // const IngredientToEdit = ingredientArray.find(val => val.ingredientId === idDeleteIngredient)
  // for (let i=0; i<1;i++){
  //
  //   ingredientArray.pop()
  //   }
  // Handle Edit Ingredients Attributes
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ingredientId: number,
    nameIngredient: string,
    unitIngredient: string,
    image_urlIngredient: string,
    summaryIngredient: string,
    createdAtTime: string
  ) => {

    const recipeObj = {
      ingredientId: ingredientId,
      nameIngredient: nameIngredient,
      quantity: e.target.value,
      unit: unitIngredient,
      image_url: image_urlIngredient,
      summary: summaryIngredient,
      createdAtTime: createdAtTime,
    }

    let foundQuant = quantity?.find(
      (quantEl) => quantEl.ingredientId === ingredientId
    )

    if (foundQuant) {
      const indexFoundQuant = quantity.findIndex(
        (element) => element.ingredientId === foundQuant.ingredientId
      )
      let newArr = [...quantity]
      if (recipeObj.quantity !== '') {
        newArr[indexFoundQuant].quantity = recipeObj.quantity
        newArr[indexFoundQuant].nameIngredient = recipeObj.nameIngredient
      } else {
        newArr.splice(indexFoundQuant, 1)
      }
      console.log('Object to update', newArr[indexFoundQuant]?.quantity)
      setQuantity(newArr)
      console.log('Quantity Arr Update ', quantity)
    } else {
      setQuantity((prev) => [...prev, recipeObj])
    }
    console.log(e.target.value, ingredientId)
  }
  const stopProp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }
  const handleChangeSearch = (e) => {
    console.log('Click')
  }

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value)
    let ingredientFounded = quantity.find(
      (recipe) => recipe.ingredientId === id
    )
    if (!ingredientFounded) return
    if (e.target.checked && ingredientFounded.ingredientId === id) {
      setArraySelected((prev) => [...prev, ingredientFounded])
    } else {
      const arrayToChange = arraySelected.filter(
        (element) => element.ingredientId !== ingredientFounded.ingredientId
      )
      setArraySelected(arrayToChange)
    }
  }

  //Handle Submit Form
  const handleSubmit = () => {
    const dateNow = new Date().toISOString()

    arraySelected.map((element) => {
      tempRecipeObj = {
        ingredientId: element.ingredientId,
        nameIngredient: element.nameIngredient,
        quantity: Number(element.quantity),
        summary: element.summary,
        unit: element.unit,
        image_url: element.image_url,
        createdAtTime: dateNow,
      }
      setRecipes((prev) => [...prev, tempRecipeObj])
    })
    setOpenModalAddDel(false)
  }
  useEffect(() => {
    setRecipes([])
    setArraySelected([])
    setQuantity([])
  }, [])

  const paperStyle = {
    padding: 20,
    height: '85vh',
    width: 525,
    margin: '25px auto',
    borderRadius: 20,
    flexGrow: 1,
  }

  return (
    <>
      <Box width='100 %' height='100vh' display='flex' style={paperStyle}>
        <Grid container>
          <Paper elevation={10} style={paperStyle}>
            <Grid
              container
              direction='row'
              wrap='wrap'
              style={{ display: 'flex', padding: '0.5rem' }}
            >
              <Grid item xs={8}>
                <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Create Recipe with My Ingredients
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Add New Recipe
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid container direction='row'>
              <Grid
                item
                lg={4}
                md={4}
                xs={4}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  maxHeight: 32,
                }}
              >
                <TextField
                  placeholder='Search'
                  onChange={handleChangeSearch}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 30,
                    },
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              wrap='wrap'
              style={{
                display: 'flex',
                padding: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {ingredientArray.map((ingredient) => {
                return (
                  <Grid
                    container
                    xs={6}
                    direction='row'
                    style={{
                      display: 'flex',
                      width: 130,
                      paddingRight: '0.3rem',
                      paddingTop: '0.3rem',
                    }}
                  >
                    <Grid item xs={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleCheckBox}
                            color='primary'
                            size='small'
                            value={ingredient.ingredientId}
                          />
                        }
                        label={
                          <Typography
                            style={{ fontSize: 11, fontWeight: 'bold' }}
                          >
                            {`${ingredient.nameIngredient}`}
                          </Typography>
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      xs={9}
                      style={{ marginLeft: 20, maxHeight: 20, maxWidth: 95 }}
                    >
                      <TextField
                        id={`${ingredient.ingredientId}`}
                        variant='outlined'
                        onChange={(e) => {
                          handleChangeInput(
                            e,
                            ingredient.ingredientId,
                            ingredient.nameIngredient,
                            ingredient.unit,
                            ingredient.image_url,
                            ingredient.summary,
                            ingredient.createdAtTime
                          )
                        }}
                        size='small'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Typography
                                style={{ display: 'flex', fontSize: 11 }}
                              >
                                {`${ingredient.unit}`}
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          style: {},
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </>
  )
}
export default CheckIngredient

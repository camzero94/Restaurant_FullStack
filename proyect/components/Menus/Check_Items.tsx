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
import { Alert } from '@mui/material'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import Item from '../../namespaces/Item'

interface propsCheckItems {
  setOpenModalAddItem?: React.Dispatch<React.SetStateAction<boolean>>
  setArraySelected?: React.Dispatch<React.SetStateAction<Item.Description[]>>
  arraySelected?: Item.Description[]
  setQuantity?: React.Dispatch<React.SetStateAction<Item.Description[]>>
  quantity?: Item.Description[]
  items?: Item.Description[]
  setItems?: React.Dispatch<React.SetStateAction<Item.Description[]>>
}

interface ingredientsTotal {
  ingredientId?: number
  nameIngredient?: string
}

const CheckItem: React.FC<propsCheckItems> = ({
    setItems,
    items,
    arraySelected,
    setArraySelected,
    setOpenModalAddItem,
  })=>{


    let tempItemObj = {
      itemId: 0,
      nameItem: '',
      type:'',
      price:0,
      quantity: 0,
      summary: '',
      unit: '',
      image_url: '',
      createdAtTime: '',
    }

    const { itemArr } = useContext(Project_Page_Ctx) as IContextProject
    const [totalIngredients, setTotalIngredients] = useState<ingredientsTotal[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    // const IngredientToEdit = ingredientArray.find(val => val.ingredientId === idDeleteIngredient)
    // for (let i=0; i<1;i++){
    //
    //   ingredientArray.pop()
    //   }

    console.log(itemArr)
    // Handle Edit Ingredients Attributes
    const handleChangeInput = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      itemId: number,
      nameItem: string,
      image_urlItem: string,
      summaryItem: string,
      createdAtTime: string
    ) => {

      const recipeObj = {
        itemId: itemId,
        nameItem: nameItem,
        quantity: e.target.value,
        image_url: image_urlItem,
        summary: summaryItem,
        createdAtTime: createdAtTime,
      }

    //   let foundQuant = quantity?.find(
    //     (quantEl) => quantEl.ingredientId === ingredientId
    //   )
    //
    //   if (foundQuant) {
    //     const indexFoundQuant = quantity.findIndex(
    //       (element) => element.ingredientId === foundQuant.ingredientId
    //     )
    //     let newArr = [...quantity]
    //     if (recipeObj.quantity !== '') {
    //       newArr[indexFoundQuant].quantity = recipeObj.quantity
    //       newArr[indexFoundQuant].nameIngredient = recipeObj.nameIngredient
    //     } else {
    //       newArr.splice(indexFoundQuant, 1)
    //     }
    //     console.log('Object to update', newArr[indexFoundQuant]?.quantity)
    //     setQuantity(newArr)
    //     console.log('Quantity Arr Update ', quantity)
    //   } else {
    //     setQuantity((prev) => [...prev, recipeObj])
    //   }
    //   console.log(e.target.value, ingredientId)
    }

    console.log("Array Selected Menu: ",arraySelected)
    const stopProp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation()
    }
    const handleChangeSearch = (e) => {
      console.log('Click')
    }

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {

      const id = Number(e.target.value)
      let itemFounded = itemArr.find(
        (item) => item.itemId === id
      )
      if (!itemFounded) return
      if (e.target.checked && itemFounded.itemId === id) {
        setArraySelected((prev) => [...prev, itemFounded])
      } else {
        const arrayToChange = arraySelected.filter(
          (element) => element.itemId!== itemFounded.itemId
        )
        setArraySelected(arrayToChange)
      }
    }

    //Handle Submit Form
    const handleSubmit = () => {

      const dateNow = new Date().toISOString()

      arraySelected.map((element) => {

        tempItemObj= {
          itemId: element.itemId,
          nameItem: element.nameItem,
          type:element.type,
          price:Number(element.price),
          quantity: 0,
          unit: element.unit,
          summary: element.summary,
          image_url: element.image_url,
          createdAtTime: dateNow,
        }
        setItems((prev) => [...prev, tempItemObj])
      })
      setOpenModalAddItem(false)
    }
    useEffect(() => {
      setItems([])
      setArraySelected([])
    }, [])

    const paperStyleMenu = {
      padding: 10,
      height: '85vh',
      width: 725,
      margin: '20px auto',
      borderRadius: 20,
      flexGrow: 1,
    }

    return (
      <>
        <Box width='100 %' height='100vh' display='flex' style={paperStyleMenu}>
          <Grid container>
            <Paper elevation={10} style={paperStyleMenu}>
              <Grid
                container
                direction='row'
                wrap='wrap'
                style={{ display: 'flex', padding: '0.5rem' }}
              >
                <Grid item xs={8}>
                  <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Create Menu with My Items 
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
                {itemArr.map((item) => {
                  return (
                    <Grid
                      container
                      xs={3}
                      direction='row'
                      style={{
                        display: 'flex',
                        width: 130,
                        paddingRight: '0.3rem',
                        paddingTop: '0.3rem',
                      }}
                    >
                      <Grid item xs={12} >
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleCheckBox}
                              color='primary'
                              size='small'
                              value={item.itemId}
                            />
                          }
                          label={
                            <Typography
                              style={{ fontSize: 11, fontWeight: 'bold' }}
                            >
                              {`${item.nameItem}`}
                            </Typography>
                          }
                        />
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
export default  CheckItem;

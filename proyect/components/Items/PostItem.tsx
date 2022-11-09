import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import {
  Modal,
  Button,
  Grid,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import React, {
  useRef,
  FormEventHandler,
  useState,
  useContext,
  useEffect,
} from 'react'
import LayoutEditIngredient from '../Auth/LayoutEditIngredient'
import Recipe from '../../namespaces/Recipe'
import { Alert } from '@mui/material'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { post_button_add_delete } from '../Styles'
import CheckIngredient from '../Items/Check_Ingredients'

export interface quantityRecipe {
  ingredientId?: number
  nameIngredient?: string
  quantity?: string
  summary?: string 
  unit?: string 
  image_url?: string
  createdAtTime?: string
}
const Post_Item: React.FC = () => {
  const { projectId, setOpenItem } = useContext(
    Project_Page_Ctx
  ) as IContextProject
  const [error, setError] = useState<String | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [cooked, setCooked] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe.Description[]>([])
  const [openModalAddDel, setOpenModalAddDel] = useState<boolean>()
  const [arraySelected, setArraySelected] = useState<quantityRecipe[]>()
  const [quantity, setQuantity] = useState<quantityRecipe[]>([])

  const itemNameRef = useRef<HTMLInputElement>()
  const typeRef = useRef<HTMLInputElement>()
  const quantityRef = useRef<HTMLInputElement>()
  const unitRef = useRef<HTMLInputElement>()
  const urlStringRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  const priceRef = useRef<HTMLInputElement>()

  const handleChangeCook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCooked(true)
    console.log('Change Cooked')
  }
  const handleChangeNotCook = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCooked(false)
    console.log('Change Cooked')
  }
  const handleClickAddDelete = () => {
    setOpenModalAddDel(true)
  }
  const handleCloseCheck = () => {
    setOpenModalAddDel(false)
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (
        itemNameRef.current?.value &&
        priceRef.current?.value &&
        unitRef.current?.value &&
        arraySelected.length >= 1
      ) {
        const token = localStorage.getItem('token')
        const dateNow = new Date().toISOString()

        const item = {
          'nameItem': itemNameRef.current?.value,
          'type': typeRef.current?.value,
          'cooking': cooked,
          'quantity': 99,
          'unit': unitRef.current?.value,
          'price': Number(priceRef.current.value),
          'summary': descriptionRef.current?.value,
          'image_url': urlStringRef.current?.value,
          'createdAtTime': dateNow,
          'updatedAtTime': dateNow,
          'ingredients': arraySelected,
          'add': false,
          'delete': false,
          'edit_flag': false,
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        }
        
        console.log('Request=====>', requestOptions)
        const response = projectId
          ? await fetch(`http://localhost:8000/api/v1/items/${projectId}`, requestOptions)
          : null
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        console.log('Returned Data', data)
        location.reload()
      } else {
        setError('Incorrectly filled')
      }
    } catch (e: any) {
      console.log(e)
      setError('Error while POST')
      setLoading(false)
    }
  }

  const formStyle = {
    // padding: 20,
    // margin: '10px auto',
    //     marginLeft: '50px',
    marginTop: '20px ',
  }

  useEffect(() => {
    console.log('Checked', cooked)
    console.log('Selected Ingredients', arraySelected)
    console.log('Quantity Arr ', quantity)
  }, [cooked, arraySelected, quantity])

  console.log('Here Recipes', recipes)
  return (
    <>
      <LayoutEditIngredient nameForm={'New Item'} submitForm={handleSubmit}>
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
              inputRef={itemNameRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Type of Item'
              variant='outlined'
              placeholder='Enter Type of Item'
              fullWidth
              size='small'
              inputRef={typeRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Price'
              variant='outlined'
              placeholder='Enter Price'
              fullWidth
              size='small'
              inputRef={priceRef}
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
              label='Unit'
              variant='outlined'
              placeholder='Enter Unit of Item'
              fullWidth
              size='small'
              inputRef={unitRef}
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

        <Grid container spacing={2} direction='row'>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox checked={cooked} onChange={handleChangeCook} />
              }
              label='Cooked'
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox checked={!cooked} onChange={handleChangeNotCook} />
              }
              label='Not Cooked'
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction='row'
          style={{
            display: 'flex',
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={6}>
            <Button
              variant='contained'
              style={post_button_add_delete}
              onClick={handleClickAddDelete}
              startIcon={<SoupKitchenIcon />}
            >
              Add Ingredient
            </Button>
          </Grid>
        </Grid>
        <Grid container style={formStyle}>
          <Grid item xs={12}>
            <Button variant='contained' fullWidth color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </LayoutEditIngredient>
      <Modal open={openModalAddDel} onClose={handleCloseCheck}>
        <CheckIngredient
          setRecipes={setRecipes}
          recipes={recipes}
          setOpenModalAddDel={setOpenModalAddDel}
          arraySelected={arraySelected}
          setArraySelected={setArraySelected}
          setQuantity={setQuantity}
          quantity={quantity}
        />
      </Modal>
    </>
  )
}

export default Post_Item

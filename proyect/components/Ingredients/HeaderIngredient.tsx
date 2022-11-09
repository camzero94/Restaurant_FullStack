import { Grid, Box, TextField, Typography, Button } from '@mui/material';
import { useContext, useRef } from 'react'
import { Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import {box_header_Ingredient} from '../Styles'


interface Iprops {
  activity: string;
}

const HeaderIngredient = (props: Iprops) => {

  const { setOpenIngredient, setSearchName, searchName } = useContext(Project_Page_Ctx) as IContextProject

  const handleClickNewIngredient = () => {
    setOpenIngredient(true);
  }
  const handleChangeSearch = (e) => {
    setSearchName(e.target?.value)
  }
  return (
    <>
      <Box className="Header-Ingredient">
        <Grid container sx={box_header_Ingredient}>
          <Grid item lg={4} md={4} xs={4} style={{ display: "flex", justifyContent: "center", maxHeight: 32 }}>
            <Typography variant="h6">{props.activity}</Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={2} >
            <Button color='primary' variant='outlined' sx={{ maxHeight: 32 }} onClick={() => handleClickNewIngredient()}>
              Add New
            </Button>
          </Grid>
          <Grid item lg={1} md={1} xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 0.5, pt: 0.5 }} >
            <SearchIcon />
          </Grid>
          <Grid item lg={4} md={4} xs={4} style={{ display: "flex", justifyContent: "flex-start", maxHeight: 32 }}>
            <TextField
              placeholder='Search'
              onChange={handleChangeSearch}
              sx={{
                "& .MuiInputBase-root": {
                  height: 30
                }
              }
              }
            >
            </TextField>
          </Grid>
        </Grid>
        <Divider />

      </Box>
    </>
  );
}
export default HeaderIngredient;

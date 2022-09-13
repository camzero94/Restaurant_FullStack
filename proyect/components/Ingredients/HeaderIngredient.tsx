import { Grid, Box, Card, Typography, Button } from '@mui/material';
import { useContext } from 'react'
import { Divider } from '@mui/material'
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Project_Page_Ctx, IContextProject } from '../../pages/users/[id]/projects/[projectid]/index'


const box_header = {
  display: "flex",
  mt: 2,
  ml: 2,
  mr: 2,
  mb: 1,
  maxWidth: 600,
  maxHeight: 32,
}
interface Iprops {
  activity: string;
}

const openModalIngredient = () => {
  //setOpenIngredient(true)
}
const HeaderIngredient = (props: Iprops) => {

  const { setOpenIngredient } = useContext(Project_Page_Ctx) as IContextProject

  const handleClickNewIngredient = () => {
    setOpenIngredient(true);
  }

  return (
    <>
      <Box className="Header-Ingredient">
        <Grid container sx={box_header}>
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
            <input />
          </Grid>
        </Grid>
        <Divider />

      </Box>
    </>
  );
}
export default HeaderIngredient;

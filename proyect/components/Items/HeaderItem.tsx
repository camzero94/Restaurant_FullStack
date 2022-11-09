import { TextField, Grid, Box, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import {box_header_Item} from '../Styles'

interface Iprops {
  activity: string;
}

const HeaderProject = (props: Iprops) => {

  const { setOpenItem } = useContext(Project_Page_Ctx) as IContextProject

  const handleNewItemClick = () => {
    setOpenItem(true)
  }
  const handleChangeSearch = () => {
    console.log("Clicked")
  }

  return (

    <>
      <Box className="Header-Item">
        <Grid container sx={box_header_Item}>
          <Grid item lg={4} md={4} xs={4} style={{ display: "flex", justifyContent: "center", maxHeight: 32 }}>
            <Typography variant="h6">{props.activity}</Typography>
          </Grid>
          <Grid item lg={2} md={2} xs={2} >
            <Button color='primary' variant='outlined' sx={{ maxHeight: 32 }} onClick={() => handleNewItemClick()}>
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
              }}
            >
            </TextField>
          </Grid>
        </Grid>
        <Divider />

      </Box>
    </>
  );
}
export default HeaderProject;

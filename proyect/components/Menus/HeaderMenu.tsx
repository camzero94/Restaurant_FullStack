import { TextField,Grid, Box, Card, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {box_header_Menu} from '../Styles'
import {useState} from 'react'


const box_header = {
  display: "flex",
  mt: 2,
  ml: 2,
  mr: 2,
}
interface Iprops{
    activity:string;
  }

const HeaderMenu = (props:Iprops) => {


  const handleChangeSearch = () =>{

    }
  const handleNewItemClick = ()=>{

    }

  return (
    <>
      <Box className="Header-Menu">
        <Grid container sx={box_header_Menu}>
          <Grid item lg={4} md={4} xs={4} style={{ display: "flex", justifyContent: "flex-start" }}>
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
export default HeaderMenu;


import React, { useContext,useRef,useState, useEffect } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material'
import {ProjectContext, IContext} from '../../pages/users/[id]/index'


const box_header = {
  display: "flex",
  mt: 2,
  ml: 2,
  mr: 2,

}

const HeaderUserPage: React.FC = () => {

  const {setOpen, open} = useContext(ProjectContext) as IContext
  const nameProjectRef = useRef();
  const nameLeader= useRef();
  const [description,setDescription] = useState<string[]>([]);

  const openModal= ()=>{
    setOpen?setOpen(true):null
    }

  return (
    <>
      <Box className="Header_Component">
        <Grid container sx={box_header} >
          <Grid item lg={6} md={3} style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6">MY WORK</Typography>
          </Grid>
          <Grid item lg={2} md={3} style={{ display: "flex", justifyContent: "center" }} >
            <Button variant="contained" type='submit' onClick={()=>openModal()}>
              <Typography variant="body1">Create new app</Typography>
            </Button>
          </Grid>
          <Grid item lg={2} md={3} style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" >
              <Typography variant="body1">Search</Typography>
            </Button>
            <Button variant="contained" >
              <Typography variant="body1">Icon</Typography>
            </Button>
          </Grid>
          <Grid item lg={2} md={3} style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button variant="contained" >
              <Typography variant="body1">Icon</Typography>
            </Button>
            <Button variant="contained" >
              <Typography variant="body1">Icon</Typography>
            </Button>
          </Grid>
        </Grid>
        <Divider />

      </Box>
    </>
  );
}

export default HeaderUserPage;

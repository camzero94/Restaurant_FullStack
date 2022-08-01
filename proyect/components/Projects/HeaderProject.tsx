import { Grid, Box, Card, Typography, Button } from '@mui/material';
import { Divider } from '@mui/material'


const box_header = {
  display: "flex",
  mt: 2,
  ml: 2,
  mr: 2,
}
interface Iprops{
    activity:string;
  }

const HeaderProject = (props:Iprops) => {
  return (
    <>
      <Box className="Header-Project">
        <Grid container sx={box_header}>
          <Grid item lg={6} md={3} style={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6">{props.activity}</Typography>
          </Grid>
        </Grid>
      <Divider />

      </Box>
    </>
  );
}
export default HeaderProject;

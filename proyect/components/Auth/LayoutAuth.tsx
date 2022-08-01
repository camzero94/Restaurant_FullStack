import React, { FormEventHandler, ReactDOM } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import Terser from '../../public/terser.svg';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
interface LayoutAuthProps {
  submitProps?: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

const LayoutAuth: React.FC<LayoutAuthProps> = ({ children, submitProps }) => {
  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 300,
    margin: '100px auto',
  };

  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <form onSubmit={submitProps}>
        <Box width='100%' height='100vh' display='flex'>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            className={classes.fieldContainer}
          >
            <Paper elevation={10} style={paperStyle}>
              <Typography variant='h5' align='center'>
                Login
              </Typography>
              <Grid item container justifyContent='center' spacing={3}>
                <Grid item>
                  <Image src={Terser} alt='terser logo' height={300} />
                </Grid>
              </Grid>
              {children}
            </Paper>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default LayoutAuth;

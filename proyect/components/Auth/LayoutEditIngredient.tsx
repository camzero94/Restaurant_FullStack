
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import React, { FormEventHandler } from 'react';
import Image from 'next/image';
import Terser from '../../public/terser.svg';

interface LayoutEditProps{
  submitForm?: FormEventHandler<HTMLFormElement>;
  children:React.ReactNode;
  nameForm?: string;
}

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const LayoutEdit: React.FC<LayoutEditProps> = ({
  children,
  submitForm,
  nameForm,
}) => {

  const paperStyle = {
    padding: 20,
    height: `${nameForm === 'New Item'? '90vh':'75vh' }`,
    width: 500,
    margin: '25px auto',
    borderRadius:20,
  };

  const classes = useStyles();

  return (
    <>
      <Container maxWidth='xs'>
        <form onSubmit={submitForm}>
          <Box width='100 %' height='100vh' display='flex'>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              className={classes.fieldContainer}
            >
              <Paper elevation={10} style={paperStyle}>
                <Grid item container spacing={1}>
                  <Grid item xs={7}>
                    <Typography variant='h5' align='left'>
                      {nameForm}    
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Image src={Terser} alt='terser logo' height={100} />
                  </Grid>
                </Grid>
                {children}
              </Paper>
            </Grid>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default LayoutEdit;

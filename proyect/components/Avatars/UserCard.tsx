import React from 'react';
import { Grid, Card, Avatar} from '@material-ui/core';
import User from '../../namespaces/User';
import { Typography, Theme } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles"

// interface UserCardStyles {
//   root: {
//     border: string,
//     padding: string,
//     borderRadius: string,
//     maxWidth: number,
//   },
//   avatar: {
//     width: string,
//     height: string,
//   },
//
// }
const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: `1.2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(7),
    borderRadius: "3px",
    maxWidth: 500,
  },
  media:{
    width: theme.spacing(10),
    height: theme.spacing(10),
  }, 
  usernameStyle:{
   display:"flex",
    justifyContent:"center",
    fontWeight: theme.typography.fontWeightBold,

  },
}));

export const UserCard: React.FC<User.Description> = ({ userId, username, email, companyname }) => {
  const url = "https://image.shutterstock.com/image-vector/facebook-icon-vector-illustration-social-600w-2109892373.jpg";
  const classes = useStyles();
  return (
    <div>
      <div key={userId}>
      <Card>
        <Grid container alignItems="center" xs={12} direction="column" className={classes.root}>
          <PhotoComponent urlImage={url} companyname={companyname} />
          <UsernameComponent username={username} />
          <CompanyComponent companyname={companyname} />
        </Grid>
      </Card>
      </div>
    </div>
  );
}

const CompanyComponent: React.FC<User.Description> = ({ companyname}) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" direction="row" alignItems="center" spacing={5}>
      <Grid item xs={12}>
        <Typography  variant="subtitle1" className={classes.usernameStyle}>Company: </Typography>
        <Typography  variant="subtitle2" className={classes.usernameStyle}>{companyname} </Typography>
      </Grid>
    </Grid>
  );
}
const UsernameComponent: React.FC<User.Description> = ({ username }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center"direction="row" alignItems="center" spacing={5}>
      <Grid item xs={12}>
        <Typography  variant="subtitle1" className={classes.usernameStyle}>User Name:</Typography>
        <Typography  variant="subtitle2" className={classes.usernameStyle}>{username} </Typography>
      </Grid>
    </Grid>
  );
}

const PhotoComponent: React.FC<User.Description> = ({ urlImage, companyname }) => {
  const classes = useStyles();
  return (
    <Avatar
      className={classes.media}
      alt={companyname}
      src={urlImage}
    />
  );
}


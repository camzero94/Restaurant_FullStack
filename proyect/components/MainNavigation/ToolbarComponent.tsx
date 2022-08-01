import React from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
} from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },

    title: {
      flexGrow: 1,
    },
  })
);

interface ToolbarProps {
  clickMenu?: () => any;
}

const ToolbarComponent: React.FC<ToolbarProps> = ({ clickMenu }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('permissions');
    localStorage.removeItem('ally-supports-cache');
    router.push('/login');
  }
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Grid container >
          <Toolbar className={classes.root}>

            <IconButton
              edge='start'
              // className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={clickMenu}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant='h6' className={classes.title}>
              My Project
            </Typography>

            <Typography variant='h6' className={classes.title}>
              <Button color='inherit'>
                <Link as='/camilo' href='/[users]'>
                  <a> To My User</a>
                </Link>
              </Button>
            </Typography>

            <Typography variant='h6' className={classes.title}>
              <Button color='inherit' onClick={() => router.push('/main_home')}>
                To Home
              </Button>
            </Typography>

            <Button color='inherit' onClick={() => handleLogOut()}>
              Log Out
            </Button>

            <Button color='inherit' onClick={() => router.push('/signup1')}>
              SignUp
            </Button>
            <Button color='inherit' onClick={() => router.push('/login')}>
              {' '}
              Login
            </Button>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
};

export default ToolbarComponent;

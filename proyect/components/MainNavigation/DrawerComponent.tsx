import {
  Box,
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/dist/client/router';
import React, {useEffect, useState,useContext} from 'react';
import User from '../../namespaces/User'

interface DrawerComponentProps extends DrawerProps {
  }
const DrawerComponent: React.FC<DrawerComponentProps > = (props) => {

  const router = useRouter();
  const [user,setUser] = useState<User.Description>();

  const buttonHandlerUsers = () => {
    return router.push(`/users/${user?.id}`);
  };
  const buttonHandlerHome = () => {
    return router.push(`/main_home/${user?.id}`);
  };
  const buttonHandlerLogin = () => {
    return router.push('/login');
  };
useEffect(()=>{
  },[])


  return (
    <>
      <Drawer {...props}>
        <Box width={300}>
          <List>
            <ListItem button onClick={buttonHandlerHome}>
              <ListItemIcon>
                <HomeIcon />
                <ListItemText primary={`${user?.username}`} />
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={buttonHandlerUsers}>
              <ListItemIcon>
                <AccountBoxIcon />
                <ListItemText primary={'Users'} />
              </ListItemIcon>
            </ListItem>
            <ListItem button onClick={buttonHandlerUsers}>
              <ListItemIcon>
                <CalendarTodayIcon />
                <ListItemText primary={'Calendar'} />
              </ListItemIcon>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerComponent;

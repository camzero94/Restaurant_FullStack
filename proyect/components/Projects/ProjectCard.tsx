import { Typography, Card, Grid, Box, IconButton, MenuItem } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import Link from 'next/link'
import Project from '../../namespaces/Project'
import { useState } from 'react'
interface props {
  project?: Project.Description;
  open?: boolean;
  setanchorEl?:React.Dispatch<React.SetStateAction<HTMLElement>>
  
}
const CardProject: React.FC<props> = ({ project,open,setanchorEl}) => {
  //Styled Menu for Card

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setanchorEl(e.currentTarget);
  }

  const cardProject = {
    root: {
      display: "flex",
      padding: 2,
      justifyContent: "space-around",
      flexWrap: "nowrap",
      width: "maxWidth",
    },
    paper: {
      display: "flex",
      flexGrow: 1,
      height: 200
    },
    containerPaper: {
      alignItems: 'center',
    },
    image: {
      display: 'flex',
      flexGrow: 1,
      width: 261,
      height: 135,
      backgroundSize: 'contain',
      maxWidth: 261
    },

    containerText: {
      display: 'flex',
      width: "maxWidth",
    },
    avatar: {
      width: 18,
      height: 18,
      bgcolor: deepOrange[500],
    },
    button: {
    }
  }

  return (
    <>
      <Grid container sx={cardProject.root}>
        <Card sx={cardProject.paper}>
          <Grid container direction="column" sx={cardProject.containerPaper}>
            <Link href='/login'>
              <Box
                component="img"
                sx={cardProject.image}
                alt="Project Default Image"
                src="https://cdn.qlikcloud.com/qmfe/hub/2.0.603/135d8c2733c0247eceaa.svg"
              />
            </Link>
            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={11} >
                <Typography variant='subtitle1' style={{ display: 'flex', fontSize: '14px', fontWeight: 600, width: 200, justifyContent: 'flex-start', maxWidth: 200 }} >
                  {project?.projectName}
                </Typography>
              </Grid>
            </Grid>
            <Grid container direction='row'>
              <Grid item xs={1}  >
              </Grid>
              <Grid item xs={1} style={{ marginTop: 8 }} >
                <Avatar
                  sx={cardProject.avatar}
                >C</Avatar>
              </Grid>
              <Grid item xs={7} style={{ marginBottom: 0, marginTop: 8 }}>
                <Typography align='left' variant='subtitle2'
                  style={{ color: '#737373', fontWeight: 400, fontSize: '12px' }}>
                  image
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ marginBottom: 5 }}>
                <IconButton
                  aria-label="customize-button"
                  aria-controls={open ? 'style-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  size='small'
                  onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}  >
              </Grid>

            </Grid>
          </Grid>
        </Card>
      </Grid >
      
    </>
  );
}

export default CardProject;

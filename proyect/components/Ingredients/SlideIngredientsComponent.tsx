
import IngredientCard from '../Ingredients/IngredientCard'
import { Grid, Box, MenuItem } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "swiper/css";
import "swiper/css/navigation";
import React, { useContext, useState } from "react";
import { Project_Page_Ctx, IContextProject } from '../../pages/users/[id]/projects/[projectid]/index'

const SlideIngredient: React.FC = () => {
 
 const {ingredientArray} = useContext(Project_Page_Ctx) as IContextProject
 console.log("Ingredient Array:",ingredientArray,"Length",ingredientArray.length )
  // const StyledMenu = styled((props: MenuProps) => (
  //   <Menu
  //     elevation={0}
  //     anchorOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'right',
  //     }}
  //     transformOrigin={{
  //       vertical: 'bottom',
  //       horizontal: 'left'
  //     }}
  //     {...props}
  //   />
  //
  // ))(({ theme }) => ({
  //   '& .MuiPaper-root': {
  //     borderRadius: 6,
  //     marginTop: theme.spacing(1),
  //     minWidth: 150,
  //     color:
  //       theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
  //     boxShadow:
  //       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  //     '& .MuiMenu-list': {
  //       padding: '2px 0',
  //       display: 'flex',
  //       flexDirection: 'column',
  //     },
  //     '& .MuiMenuItem-root': {
  //       justifyContent: 'flex-start',
  //       '& .MuiSvgIcon-root': {
  //         fontSize: 18,
  //         color: theme.palette.text.secondary,
  //         marginRight: theme.spacing(1.5),
  //
  //       },
  //       '&:active': {
  //         backgroundColor: alpha(
  //           theme.palette.primary.main,
  //           theme.palette.action.selectedOpacity,
  //         ),
  //       },
  //     },
  //   },
  // }
  // ))
  const boxOutside = {
    display: "flex",
    width: "maxWidth",
    height: 200,
    spacing: 5,
    justifyContent: "center"
  }

  // const { projectArr, setOpenEdit } = useContext(ProjectContext) as IContext
  //
  //
  // const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  //
  // const open = Boolean(anchorEl)
  //
  // const handleClose = () => {
  //   setanchorEl(null);
  // }
  // const handleOpenEdit = () => {
  //   setOpenEdit(true);
  // }
  
  return (

    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4} navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <Box sx={boxOutside}>
          <Grid container direction="row" alignContent="baseline">
          {ingredientArray.map((ingredient)=>{
            return(
            <SwiperSlide>
              <Grid item >
                <IngredientCard ingredient={ingredient}/>
              </Grid>
            </SwiperSlide>

            )


            }
          )}


          </Grid>
        </Box >
      </Swiper>

    </>
  );
}

      // <StyledMenu
      //   id="style-menu"
      //   MenuListProps={{
      //     'aria-labelledby': 'customized-button',
      //
      //   }}
      //   anchorEl={anchorEl}
      //   open={open}
      //   onClose={handleClose}
      // >
      //   <MenuItem onClick={handleOpenEdit} disableRipple>
      //     <EditIcon />
      //     Edit
      //   </MenuItem>
      //   <MenuItem onClick={handleClose} disableRipple>
      //     <FileCopyIcon />
      //     Delete
      //   </MenuItem>
      //   <Divider sx={{ my: 0.5 }} />
      //   <MenuItem onClick={handleClose} disableRipple>
      //     <ArchiveIcon />
      //     Archive
      //   </MenuItem>
      //   <MenuItem onClick={handleClose} disableRipple>
      //     <MoreHorizIcon />
      //     More
      //   </MenuItem>
      // </StyledMenu>
export default SlideIngredient;





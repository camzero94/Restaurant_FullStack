
import React, { useContext, useState, useEffect } from "react";
import { Grid, Box, MenuItem } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "swiper/css";
import "swiper/css/navigation";

import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { Modal } from '@mui/material'
import Edit_Item from '../Items/Edit_Item'
import MenuCardComponent from '../Menus/MenuCard'
import  StyledMenu from '../MenuComponents'

const boxOutside = {
  display: "flex",
  width: "maxWidth",
  height: 200,
  spacing: 5,
  justifyContent: "center"
}
const SlideMenu: React.FC = () => {

  const { openEditMenu, setOpenEditMenu, menuArray,  anchorElMenu, setanchorElMenu} = useContext(Project_Page_Ctx) as IContextProject

  // const openItem = Boolean(anchorElItem)
  // console.log("Open Item", openItem)
  //
  // const handleCloseItem = () => {
  //   setanchorElItem(null);
  //   setDeleteFlagItem(false)
  // }
    console.log('Menu Array ',menuArray)
  // let foundArray = ingredientArray.filter(ingredient => ingredient.nameIngredient === searchName)
  //  console.log("Found Array:===>",foundArray)
  //  console.log("Anchor El ===>" + anchorEl)

  // const handleOpenEditItem = () => {
  //   setOpenEditItem(true);
  //   console.log("Clicked Edit Open", openEditItem)
  // }
  //
  // const handleCloseEditItem = () => {
  //   setOpenEditItem(false);
  //   console.log("Clicked Edit Close", openEditItem)
  //
  // }
  // const handleDeleteItem= async () => {
  //   setDeleteFlagItem(true)
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
            {
              menuArray
                .map((menu) => {
                  return (
                    <SwiperSlide key={menu.menuId}>
                      <Grid item >
                        <MenuCardComponent menu={menu} setanchorElMenu={setanchorElMenu}  />
                      </Grid>
                    </SwiperSlide>
                  )
                })
            }
          </Grid>
        </Box >
      </Swiper>



    </>
  );
}

      // <StyledMenu
      //   id="style-menu"
      //   MenuListProps={{
      //    'aria-labelledby': 'customized-button',
      //
      //   }}
      //   anchorEl={anchorElItem}
      //   open={openItem}
      //   onClose={handleCloseItem}
      // >
      //
      //   <Modal
      //     open={openEditItem}
      //     onClose={handleCloseEditItem}
      //   >
      //     <Edit_Item/>
      //   </Modal>
      //
      //   <MenuItem onClick={handleOpenEditItem} disableRipple>
      //     <EditIcon />
      //     Edit
      //   </MenuItem>
      //
      //   <MenuItem onClick={handleDeleteItem } disableRipple>
      //     <FileCopyIcon />
      //     Delete
      //   </MenuItem>
      //
      //   <Divider sx={{ my: 0.5 }} />
      //   <MenuItem onClick={handleCloseItem} disableRipple>
      //     <ArchiveIcon />
      //     Archive
      //   </MenuItem>
      //   <MenuItem onClick={handleCloseItem} disableRipple>
      //     <MoreHorizIcon />
      //     More
      //   </MenuItem>
      // </StyledMenu>
export default SlideMenu;




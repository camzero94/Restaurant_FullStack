import ItemCardComponent from '../Items/ItemCard'
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
import React, { useContext, useState, useEffect } from "react";
import { Project_Page_Ctx } from '../../pages/users/[id]/projects/[projectid]/index'
import IContextProject from '../../namespaces/Ingredients_Page_States'
import { Modal } from '@mui/material'
import Edit_Item from '../Items/Edit_Item'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    {...props}
  />

))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '2px 0',
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiMenuItem-root': {
      justifyContent: 'flex-start',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),

      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}
))
const boxOutside = {
  display: "flex",
  width: "maxWidth",
  height: 200,
  spacing: 5,
  justifyContent: "center"
}
const SlideItem: React.FC = () => {

  const { openEditItem, setOpenEditItem, itemArr, searchName, setIdDeletedItem, setDeleteFlagItem, anchorElItem, setanchorElItem } = useContext(Project_Page_Ctx) as IContextProject


  const openItem = Boolean(anchorElItem)
  console.log("Open Item", openItem)

  const handleCloseItem = () => {
    setanchorElItem(null);
    setDeleteFlagItem(false)
  }

  // let foundArray = ingredientArray.filter(ingredient => ingredient.nameIngredient === searchName)
  //  console.log("Found Array:===>",foundArray)
  //  console.log("Anchor El ===>" + anchorEl)

  const handleOpenEditItem = () => {
    setOpenEditItem(true);
    console.log("Clicked Edit Open", openEditItem)
  }

  const handleCloseEditItem = () => {
    setOpenEditItem(false);
    console.log("Clicked Edit Close", openEditItem)

  }
  const handleDeleteItem= async () => {
    setDeleteFlagItem(true)
  }


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
              itemArr
                .map((item) => {
                  return (
                    <SwiperSlide key={item.itemId}>
                      <Grid item >
                        <ItemCardComponent item={item} setanchorElItem={setanchorElItem} setIdDeletedItem={setIdDeletedItem} />
                      </Grid>
                    </SwiperSlide>
                  )
                })
            }
          </Grid>
        </Box >
      </Swiper>

      <StyledMenu
        id="style-menu"
        MenuListProps={{
         'aria-labelledby': 'customized-button',

        }}
        anchorEl={anchorElItem}
        open={openItem}
        onClose={handleCloseItem}
      >

        <Modal
          open={openEditItem}
          onClose={handleCloseEditItem}
        >
          <Edit_Item/>
        </Modal>

        <MenuItem onClick={handleOpenEditItem} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteItem } disableRipple>
          <FileCopyIcon />
          Delete
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleCloseItem} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleCloseItem} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>


    </>
  );
}

export default SlideItem;



            // { searchName? 
            //   ingredientArray.filter(searchIngredient=>searchIngredient.nameIngredient === searchName)
            //   .map((ingredient) => {
            //     return (
            //       <SwiperSlide key={ingredient.ingredientId}>
            //         <Grid item >
            //           <IngredientCard ingredient={ingredient} setanchorEl={setanchorEl} setIdDeletedIngredient={setIdDeletedIngredient} />
            //         </Grid>
            //       </SwiperSlide>
            //     )
            //   }
            //   )
            // :
            //   ingredientArray.map((ingredient) => {
            //     return (
            //       <SwiperSlide key={ingredient.ingredientId}>
            //         <Grid item >
            //           <IngredientCard ingredient={ingredient} setanchorEl={setanchorEl} setIdDeletedIngredient={setIdDeletedIngredient} />
            //         </Grid>
            //       </SwiperSlide>
            //     )
            //   }
            //   )
            // }

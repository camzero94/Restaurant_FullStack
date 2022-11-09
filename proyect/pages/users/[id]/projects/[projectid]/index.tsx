
import React, { createContext, useState, useEffect } from 'react';
import SecurityLayout from '../../../../../components/MainNavigation/SecurityLayout'
import LayoutComponent from '../../../../../components/MainNavigation/LayoutComponent'
import HeaderIngredient from '../../../../../components/Ingredients/HeaderIngredient'
import SlideIngredient from '../../../../../components/Ingredients/SlideIngredientsComponent'
import SlideItem from '../../../../../components/Items/SlideItemsComponent'
import { Modal } from '@mui/material'
import Post_Ingredient from '../../../../../components/Ingredients/Post_Ingredient'
import Post_Item from '../../../../../components/Items/PostItem'
import { useRouter } from 'next/router'
import IContextProject from '../../../../../namespaces/Ingredients_Page_States'
import HeaderItem from '../../../../../components/Items/HeaderItem'
import Ingredient from '../../../../../namespaces/Ingredient'
import Item from '../../../../../namespaces/Item'


export const Project_Page_Ctx = createContext<IContextProject | null>(null)

let ingredientArray: Ingredient.Description[] = [];
let itemArr: Item.Description[] = []

function Project_Page() {

  const router = useRouter()

  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  const [projectId, setProjectId] = useState<any>(null)

  //Ingredients States
  const [openIngredientModal, setOpenIngredient] = useState<boolean>(false);
  const [openEditIngredient, setOpenEditIngredient] = useState<boolean>(false);
  const [ingredientArr, setIngredient] = useState<Ingredient.Description[]>([])
  const [idDeleteIngredient, setIdDeletedIngredient] = useState<any>(null)
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false)
  const [searchName, setSearchName] = useState<string>("")

  //Item States
  const [openItemModal, setOpenItem] = useState<boolean>(false)
  const [openEditItem, setOpenEditItem] = useState<boolean>(false);
  const [itemArray,setItemArray] = useState<Item.Description[]>([])
  const [anchorElItem, setanchorElItem] = useState<null | HTMLElement>(null)

  const [idDeleteItem, setIdDeletedItem] = useState<any>(null)
  const [deleteFlagItem, setDeleteFlagItem] = useState<boolean>(false)
  // const [addRecipeItem,setRecipeItem] = useState<Recipe>

  //Menus States
  const [openMenuModal, setOpenMenu] = useState<boolean>(false)
  const [openEditMenu, setOpenEditMenu] = useState<boolean>(false);

  const statesPage = {

    // Get Id project
    projectId: projectId,

    //Ingredients States
    ingredientArray: ingredientArray,
    setOpenIngredient: setOpenIngredient,
    setOpenEditIngredient: setOpenEditIngredient,
    openEditIngredient: openEditIngredient,
    setIdDeletedIngredient: setIdDeletedIngredient,
    idDeleteIngredient: idDeleteIngredient,
    setDeleteFlag: setDeleteFlag,
    setanchorEl: setanchorEl,
    anchorEl: anchorEl,
    setSearchName: setSearchName,
    searchName: searchName,

    //Items States
    setOpenItem:setOpenItem,
    itemArr:itemArr,
    setOpenEditItem:setOpenEditItem,
    openEditItem:openEditItem,
    setanchorElItem: setanchorElItem,
    anchorElItem: anchorElItem,

    idDeleteItem: idDeleteItem,
    setIdDeletedItem: setIdDeletedItem,
    setDeleteFlagItem: setDeleteFlagItem,

  }

  //Methods Ingredients Modals
  const handleCloseIngredient = () => {
    setOpenIngredient(false);
  }
  //Methods Item Modals
  const handleCloseItem= () => {
    setOpenItem(false);
  }
  
  

  const getItemsAsync = async (token: String, projectid: any) => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(`http://localhost:8000/api/v1/items/${projectid}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()
      itemArr= Object.assign([], data)
      setItemArray(itemArr)
      setProjectId(projectid)
      // setanchorEl(null)
    }
    catch (error: any) {
      console.log("Could not Fetch Data Item" + error);
    }
  }

  const getIngredientsAsync = async (token: String, projectid: any) => {

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(`http://localhost:8000/api/v1/ingredients/${projectid}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()
      ingredientArray = Object.assign([], data)
      setIngredient(ingredientArray)
      setProjectId(projectid)
      setanchorEl(null)
    }
    catch (error: any) {
      console.log("Could not Fetch Data Ingredients " + error);
    }
  }

  const deleteIngredientAsync = async (token: string, idDeleteIngredient: any) => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(`http://localhost:8000/api/v1/ingredient/${idDeleteIngredient}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()

      console.log(data)
      setanchorEl(null)
      window.location.reload()
    }
    catch (error: any) {
      console.log("Could not Fetch Data Ingredients " + error);
    }
  }

  const deleteItemAsync = async (token: string, idDeleteItem: any) => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    // console.log("Here Id Selected Ingredient inside the async funtion ", idDeleteIngredient)
    try {
      const res = await fetch(`http://localhost:8000/api/v1/item/${idDeleteItem}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()

      console.log(data)
      setanchorEl(null)
      window.location.reload()
    }
    catch (error: any) {
      console.log("Could not Fetch Data Ingredients " + error);
    }
  }
  useEffect(() => {

    //Get Project Id for Post,Edit and Delete Items, Ingredients and Menus
    const { projectid } = router.query
    setProjectId(projectid)
    //Get Token From Local storage to be able to acces the Backend
    const token = localStorage.getItem('token')

    //Ingredients States
    //If the project Id exists correct get all Ingredients fron backend
    projectid ? getIngredientsAsync(token, projectid) : null

    //Get Id from Ingredient to be deleted
    console.log("Flag is Ingredient =====",deleteFlag)
    deleteFlag ? deleteIngredientAsync(token, idDeleteIngredient) : null

    //Item States
    projectid ? getItemsAsync(token, projectid) : null

    //Get Id from Item to be deleted
    console.log("Flag is =====",deleteFlagItem)
    deleteFlagItem ? deleteItemAsync(token, idDeleteItem) : null

  }, [router, deleteFlag,deleteFlagItem]);


  return (
    <>
      <Project_Page_Ctx.Provider value={statesPage}>
        <SecurityLayout>
          <LayoutComponent>
            <HeaderItem activity="My Items" />
            <SlideItem/>
            <HeaderIngredient activity="My Ingredients" />
            <SlideIngredient />
          </LayoutComponent>
          <Modal
            open={openIngredientModal}
            onClose={handleCloseIngredient}
          >
            <Post_Ingredient />
          </Modal>
          <Modal
            open={openItemModal}
            onClose={handleCloseItem}
          >
            <Post_Item/>
          </Modal>
        </SecurityLayout>
      </Project_Page_Ctx.Provider >
    </>
  );
}


export default Project_Page;






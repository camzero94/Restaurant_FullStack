
import React, { createContext, useState, useEffect } from 'react';
import SecurityLayout from '../../../../../components/MainNavigation/SecurityLayout'
import LayoutComponent from '../../../../../components/MainNavigation/LayoutComponent'
import HeaderIngredient from '../../../../../components/Ingredients/HeaderIngredient'
import SlideIngredient from '../../../../../components/Ingredients/SlideIngredientsComponent'
import { Dispatch, SetStateAction } from 'react'
import Ingredient from '../../../../../namespaces/Ingredient'
import { Modal } from '@mui/material'
import Post_Ingredient from '../../../../../components/Ingredients/Post_Ingredient'
import { useRouter } from 'next/router'

export interface IContextProject {

  //Ingredient States
  openIngredientModal?: boolean;
  setOpenIngredient?: Dispatch<SetStateAction<boolean>>;
  openEditIngredient?: boolean;
  setOpenEditIngredient?: Dispatch<SetStateAction<boolean>>;
  ingredientArray?: Ingredient.Description[];

  //Items States 
  openItemModal?: boolean;
  setOpenItem?: Dispatch<SetStateAction<boolean>>;
  openEditItem?: boolean;
  setOpenEditItem?: Dispatch<SetStateAction<boolean>>;

  //Menu States 
  openMenuModal?: boolean;
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
  openEditMenu?: boolean;
  setOpenEditMenu?: Dispatch<SetStateAction<boolean>>;

  userId?: number | string;

  //Menu States 

  //Query Project
  projectId?: any
}

export const Project_Page_Ctx = createContext<IContextProject | null>(null)

let ingredientArray: Ingredient.Description[] = [];

function Project_Page() {

  const router = useRouter()

  const [projectId, setProjectId] = useState<any>(null)

  const [openIngredientModal, setOpenIngredient] = useState<boolean>(false);
  const [openEditIngredient, setOpenEditIngredient] = useState<boolean>(false);
  const [ingredientArr, setIngredient] = useState<Ingredient.Description[]>([])

  const [openItemModal, setOpenItem] = useState<boolean>(false)
  const [openEditItem, setOpenEditItem] = useState<boolean>(false);

  const [openMenuModal, setOpenMenu] = useState<boolean>(false)
  const [openEditMenu, setOpenEditMenu] = useState<boolean>(false);

  const handleCloseIngredient = () => {
    setOpenIngredient(false);
  }

  // const obj = {
  //   setOpenIngredient: setOpenIngredient,
  //   setOpenEditIngredient: setOpenEditIngredient,
  //   ingredientArr: ingredientArray
  //   // projectId: projectId
  // };

  useEffect(() => {

    // router.isReady? setProjectId(router.query):null
    const { projectid } = router.query
    setProjectId(projectid)
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    console.log("Project Id=====" + projectid)
    const res = projectid ? fetch(`http://localhost:8000/api/v1/ingredients/${projectid}`, requestOptions)
      .then((res) => {
        res.json()
          .then((data) => {
            ingredientArray = Object.assign([], data)
            setIngredient(ingredientArray)
            setProjectId(projectid)
          })
      }).catch((error) => {
        console.log(error);
      }) : null
  }, [router]);

  console.log("ProjectId Later", projectId)


  return (
    <>
      <Project_Page_Ctx.Provider value={{
        ingredientArray,
        setOpenIngredient,
        setOpenEditIngredient,
        projectId

      }}>
        <SecurityLayout>
          <LayoutComponent>
            <HeaderIngredient activity="My Ingredients" />
            <SlideIngredient />
          </LayoutComponent>
          <Modal
            open={openIngredientModal}
            onClose={handleCloseIngredient}
          >
            <Post_Ingredient />
          </Modal>
        </SecurityLayout>
      </Project_Page_Ctx.Provider >
    </>
  );
}


export default Project_Page;






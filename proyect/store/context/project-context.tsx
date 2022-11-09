import React, {createContext, useState} from 'react'
import { Dispatch, SetStateAction } from 'react'
import Ingredient from '../../namespaces/Ingredient'

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
  setanchorEl?: Dispatch<SetStateAction<HTMLElement | null>>;
  anchorEl?: HTMLElement | null
  //Query Project
  projectId?: any


  //Delete Ingredient
  setIdDeletedIngredient?: Dispatch<SetStateAction<any>>;
  setDeleteFlag?: Dispatch<SetStateAction<boolean>>;
}



export const Project_Page_Ctx = createContext<IContextProject | null>(null)
let ingredientArray: Ingredient.Description[] = [];

function PageProjectProvider({children}){


  // const router = useRouter()

  const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null)
  const [projectId, setProjectId] = useState<any>(null)

//Ingredients States
  const [openIngredientModal, setOpenIngredient] = useState<boolean>(false);
  const [openEditIngredient, setOpenEditIngredient] = useState<boolean>(false);
  const [ingredientArr, setIngredient] = useState<Ingredient.Description[]>([])
  const [idDeleteIngredient, setIdDeletedIngredient] = useState<any>(null)
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false)

//Item States
  const [openItemModal, setOpenItem] = useState<boolean>(false)
  const [openEditItem, setOpenEditItem] = useState<boolean>(false);

  const [openMenuModal, setOpenMenu] = useState<boolean>(false)
  const [openEditMenu, setOpenEditMenu] = useState<boolean>(false);

  const statesPage = {
    //Ingredients States
    ingredientArray: ingredientArray,
    setOpenIngredient: setOpenIngredient,
    setOpenEditIngredient: setOpenEditIngredient,
    setIdDeletedIngredient: setIdDeletedIngredient,
    setDeleteFlag: setDeleteFlag,
    setanchorEl: setanchorEl,
    anchorEl: anchorEl,

    // Get Id project
    projectId: projectId,

  }

  const handleCloseIngredient = () => {
    setOpenIngredient(false);
  }

  const getItems = async (token: String, projectid: any) => {

  }
  const getIngredientsAsync = async (token: String, projectid: any) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    console.log("Project Id=====" + projectid)
    try {
      const res = await fetch(`http://localhost:8000/api/v1/ingredients/${projectid}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()
      ingredientArray = Object.assign([], data)
      setIngredient(ingredientArray)
      setProjectId(projectid)
      console.log(ingredientArray)
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
    console.log("Here Id Selected Ingredient inside the async funtion ", idDeleteIngredient)
    try {
      const res = await fetch(`http://localhost:8000/api/v1/ingredient/${idDeleteIngredient}`, requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json()

      console.log(data)
      setanchorEl(null)
    }
    catch (error: any) {
      console.log("Could not Fetch Data Ingredients " + error);
    }

  }

  return <Project_Page_Ctx.Provider value={{}}>{children}</Project_Page_Ctx.Provider>

}

export default PageProjectProvider


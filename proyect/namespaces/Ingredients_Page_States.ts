
import { Dispatch, SetStateAction } from 'react'
import Ingredient from '../namespaces/Ingredient'
import Item from './Item'

interface IContextProject {

  //Ingredient States
  openIngredientModal?: boolean;
  setOpenIngredient?: Dispatch<SetStateAction<boolean>>;
  openEditIngredient?: boolean;
  setOpenEditIngredient?: Dispatch<SetStateAction<boolean>>;
  ingredientArray?: Ingredient.Description[];
  searchName?: string
  setSearchName?:Dispatch<SetStateAction<string>>;

  //Items States
  openItemModal?: boolean;
  setOpenItem?: Dispatch<SetStateAction<boolean>>;
  openEditItem?: boolean;
  setOpenEditItem?: Dispatch<SetStateAction<boolean>>;
  itemArr?: Item.Description[]

  //Menu States
  openMenuModal?: boolean;
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
  openEditMenu?: boolean;
  setOpenEditMenu?: Dispatch<SetStateAction<boolean>>;

  userId?: number | string;

  //Menu States
  setanchorEl?: Dispatch<SetStateAction<HTMLElement | null>>;
  anchorEl?: HTMLElement | null
  setanchorElItem?: Dispatch<SetStateAction<HTMLElement | null>>;
  anchorElItem?: HTMLElement | null
  //Query Project
  projectId?: any


  //Delete Ingredient
  setIdDeletedIngredient?: Dispatch<SetStateAction<any>>;
  setDeleteFlag?: Dispatch<SetStateAction<boolean>>;
  idDeleteIngredient?:any;

  //Delete Item
  setIdDeletedItem?: Dispatch<SetStateAction<any>>;
  setDeleteFlagItem?: Dispatch<SetStateAction<boolean>>;
  idDeleteItem?:any;

}

export default IContextProject;

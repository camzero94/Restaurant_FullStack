import Ingredient from './Ingredient'
import Item from './Item'

export namespace Recipe {
  export interface Description{
  ingredientId?:number;
  nameIngredient?:string;
  quantity?:number;
  summary?:string;
  unit?:string;
  image_url?:string;
  createdAtTime?:string;
  ingredient?:Ingredient.Description[]
  }
}

export default Recipe;

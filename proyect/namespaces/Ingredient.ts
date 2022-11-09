
import Recipe from './Recipe'
namespace Ingredient{
  export interface Description{
  ingredientId?:number | null;
  nameIngredient:string;
  summary:string;
  quantity?:number;
  unit?:string;
  createdAtTime?:Date;
  updatedAtTime?:Date;
  image_url?:string
  items?:Recipe.Description[]
  }
}




export default Ingredient;




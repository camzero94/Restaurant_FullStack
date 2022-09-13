
namespace Ingredient{
  export interface Description{
  ingredientId?:number | string;
  nameIngredient:string;
  description:string;
  quantity?:number;
  unit?:string;
  createdAtTime?:Date;
  updatedAtTime?:Date;
  content?:string
  }
}

export default Ingredient;

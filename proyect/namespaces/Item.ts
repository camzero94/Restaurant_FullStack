import Recipe from './Recipe'

namespace Item {
  export interface Description{
  itemId?:number | null;
  nameItem:string;
  price:number;
  summary:string;
  type?:string;
  quantity?:number;
  unit?:string;
  createdAtTime?:string;
  updatedAtTime?:string;
  image_url?:string
  ingredients?: Recipe.Description[]
  }
}


export default Item;



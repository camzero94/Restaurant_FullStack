
import MenuItem from './Menu_Item'
namespace Menu{
  export interface Description{
  menuId?:number | null;
  nameMenu:string;
  summary:string;
  type:string;
  createdAtTime?:Date;
  updatedAtTime?:Date;
  image_url?:string
  items: MenuItem.Description[]
  }
}

export default Menu;

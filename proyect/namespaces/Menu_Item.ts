
import Item from './Item'

namespace MenuItem{
  export interface Description{
  menuId?:number | null;
  itemId:string;
  item?: Item.Description;
  }
}

export default MenuItem;

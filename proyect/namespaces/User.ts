

namespace User {
  export interface Description {
    id?: number;
    username?: string;
    firstname?:string,
    lastname?: string;
    email?: string;
    password?:string
    cellphone?: string;
    companyname?:string;
    urlImage?:string
    is_active?:boolean;
    is_superuser?:boolean;
    is_leader?:boolean;
    projects:any[];

  }
  

}
export default User;

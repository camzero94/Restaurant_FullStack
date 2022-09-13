
namespace Project{
  export interface Description{
  projectId?:number | string;
  projectName:string;
  description:string;
  nameOfLeader?:string;
  createdAtTime?:Date;
  updatedAtTime?:Date;
  users?:any[];
  }
}

export default Project;

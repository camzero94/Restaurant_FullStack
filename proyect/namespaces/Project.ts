
namespace Project{
  export interface Description{
  projectId?:number;
  projectName:string;
  description:string;
  nameOfLeader?:string;
  createdAtTime?:Date;
  updatedAtTime?:Date;
  users?:any[];
  }
}

export default Project;

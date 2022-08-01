
import React, { useState, createContext, useEffect } from 'react';
import LayoutComponent from '../../../components/MainNavigation/LayoutComponent';
import Project from '../../../namespaces/Project'
import HeaderUserPage from '../../../components/Projects/HeaderUser'
import SimpleSlider from '../../../components/Projects/SlideProjectsComponent'
import HeaderProject from '../../../components/Projects/HeaderProject'
import { Modal } from '@mui/material'
import SecurityLayout from '../../../components/MainNavigation/SecurityLayout'
import { Dispatch, SetStateAction } from 'react'
import Signup_Project from '../../../components/Signup_Project'
import { GetStaticProps, GetStaticPaths } from 'next'

export interface IContext {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  projectArr?: Project.Description[];
}

export const ProjectContext = createContext<IContext | null>(null);

let projectInit: Project.Description = {
  projectId: 0,
  projectName: '',
  nameOfLeader: '',
  description: '',
  createdAtTime: new Date(),
  updatedAtTime: new Date(),
  users: [],
}
let projectArr: Project.Description[] = [];
function UserHome() {
  let limit = 10;
  const handleClose = () =>
    setOpen(false);
  ;

  const [project, setProject] = useState<Project.Description[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');


  useEffect(() => {
    console.log("Here")
    console.log(projectArr)
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    const res = fetch(`http://localhost:8000/api/v1/projects`, requestOptions)
      .then((res) => {
        res.json()
          .then((data) => {
            projectArr = Object.assign([], data)
            setProject(projectArr)
            console.log("ArrayHere" + projectArr);
          })
      }).catch((error) => {
        console.log(error);
      })
  }, [])
  console.log("ArrayHereAfterUseEffect" + projectArr);

  return (
    <>
      <SecurityLayout>
        <ProjectContext.Provider value={{ setOpen, open, projectArr }}>
          <LayoutComponent  >
            <HeaderUserPage />
            <HeaderProject activity="Recently Projects" />
            <SimpleSlider/>
            <HeaderProject activity="My Projects" />
            <HeaderProject activity="My Data" />
          </LayoutComponent>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Signup_Project />
          </Modal>
        </ProjectContext.Provider >
      </SecurityLayout>
    </>
  );

}

//
// export const getStaticProps: GetStaticProps = async() => {
//
//     const requestOptions = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'Access-Control-Expose-Headers': 'Content-Range'
//
//       },
//     };
//
//   const res = await fetch(`http://localhost:8000/api/v1/projects`)
//   return{
//       props:{
//
//         }
//     }
//   }
// export const getStaticPaths: GetStaticPaths= async() => {
//
//   return{
//     paths:[],
//     fallback:false,
//
//     }
//     
//   }

export default UserHome;





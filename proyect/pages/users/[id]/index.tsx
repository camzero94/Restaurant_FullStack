
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

export interface IContext {
  open?: boolean;
  openEdit?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setOpenEdit?: Dispatch<SetStateAction<boolean>>;
  projectArr?: Project.Description[];
  userId?: number | string;
}

export const ProjectContext = createContext<IContext | null>(null);

let projectArr: Project.Description[] = [];

function UserHome() {

  const handleClose = () =>
    setOpen(false);
  ;

  const [project, setProject] = useState<Project.Description[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
 
  const userId = typeof window !== 'undefined'? localStorage.getItem('id'):null;
  console.log(userId) 
  const handleCloseEdit = () =>
    setOpenEdit(false);
  ;
  useEffect(() => {

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
          })
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <>
      <SecurityLayout>
        <ProjectContext.Provider value={{setOpenEdit,openEdit ,setOpen, open, projectArr,userId }}>
          <LayoutComponent  >
            <HeaderUserPage />
            <HeaderProject activity="Recently Projects" />
            <SimpleSlider/>
            <HeaderProject activity="My Projects" />
            <SimpleSlider/>
            <HeaderProject activity="My Data" />
          </LayoutComponent>

          <Modal
            open={open}
            onClose={handleClose}
          >
            <Signup_Project />
          </Modal>

          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
          >
            <Signup_Project />
          </Modal>
        </ProjectContext.Provider >
      </SecurityLayout>
    </>
  );

}

//
export default UserHome;





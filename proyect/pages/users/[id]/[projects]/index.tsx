
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import React, { createContext, useState, useEffect } from 'react';
import LayoutComponent from '../../../../components/MainNavigation/LayoutComponent';
import User from '../../../../namespaces/User';
import { Grid, Box, Card, Typography , Button} from '@mui/material';
import {Divider} from '@mui/material'
// import { UserCard } from '../../../../components/Avatars/UserCard';
// import LineChartComponent from '../../../../components/Charts/Line'

function Users({ userById }: InferGetStaticPropsType<typeof getServerSideProps>) {

  useEffect(() => {
  }, []);


  return (
  <>
  Hello Work Space
  </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  console.log(id);
  const res = await fetch(`http://localhost:8000/${id}`)
  const userById: User.Description = await res.json()
  console.log(userById);
  return {
    props: {
      userById
    },
  }
}


export default Users;






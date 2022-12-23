
import UserEdit from '../../components/Admin/UserEdit';
import UserList from '../../components/Admin/UserList';
import UserCreate from '../../components/Admin/UserCreate';
import React, { useEffect, useState, FC } from 'react';
import { fetchUtils, Admin as ReactAdmin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from '../../utils/authProvider';

const isBrowser = typeof window !== "undefined";

const AdminComponent = () => {

  const httpClient = (url: any, options: any) => {

    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('Access-Control-Expose-Headers', 'Content-Range');
    console.log(options) 
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };

  const dataProvider = simpleRestProvider('http://localhost:8000/api/v1', httpClient);

  return isBrowser ? (
    <ReactAdmin dataProvider={dataProvider} authProvider={authProvider}>
      {
        (permissions: 'admin' | 'follower') => [
        permissions === 'admin' ? (
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
        ) : null,
      ]
      }
    </ReactAdmin>
  ) : null
};

export default AdminComponent;



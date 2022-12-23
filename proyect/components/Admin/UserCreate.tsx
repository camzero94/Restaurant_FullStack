import React, { FC } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  BooleanInput,
} from 'react-admin';

const UserCreate: React.FC = (props)=>(
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <PasswordInput source="password" />
      <BooleanInput source="is_superuser" />
      <BooleanInput source="is_active" />
    </SimpleForm>
  </Create>
)
export default UserCreate;

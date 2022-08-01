import decodeJwt from 'jwt-decode'
import User from '../namespaces/User'
import { verify } from 'jsonwebtoken'
import Project from '../namespaces/Project';

export const isAuthenticated = () => {
  const ISSERVER = typeof window === "undefined";
  let permissions;
  if (!ISSERVER) {
    permissions = localStorage.getItem('permissions');
  }
  console.log(permissions);
  if (!permissions) {
    return false;
  }
  return permissions === 'follower' || permissions === 'leader' || permissions === 'admin' ? true : false
};

export const isInfoComplete = (currentUser: User.Description) => {
  console.log("Here Info");
  console.log(currentUser);
  const keys = Object.keys(currentUser);

  const keyNoPassword: string[] = keys.filter(key => key !== 'password');
  for (const element of keyNoPassword) {
    if (currentUser[element] === '') {
      console.log("Returned False form info")
      return false
    }
  }
  return true;

}

export const isValidToken = (current_token: string) => {

  if (current_token === undefined) {
    return false;
  }
  try {
    verify(current_token, 'SECRET');
    return true;
  } catch (e) {
    return false;
  }
}

export const isProjectInfoComplete = (postedProject: Project.Description) => {

  const keys = Object.keys(postedProject);
  for (const element of keys) {
    //Check projectId is a number
    if (element === 'projectId' && typeof (postedProject[element]) !== 'number') {
      return false;
    }
    //Check have at least one user
    if (element === 'users' && postedProject[element]?.length === 0) {
      return false;
    }
    if (postedProject[element] === '') {
      return false;
    }
  }
  return true;

}

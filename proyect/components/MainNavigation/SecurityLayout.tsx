
import React, { useContext, useEffect, createContext, useState } from 'react';
import { useRouter } from 'next/router'
import { verify } from 'jsonwebtoken'
import CircularProgress from '@mui/material/CircularProgress'
import { Filter2 } from '@mui/icons-material';



interface LayoutProps {
  children: React.ReactNode,

}
export const SecurityContext = createContext<any>(null);

const SecurityLayout: React.FC<LayoutProps> = ({ children }) => {

  const router = useRouter();
  const [isloading, setisLoading] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === undefined) {
      router.push('/login');
    }
    try {
      verify(token ? token : '', 'SECRET');
      setisLoading(true)
    } catch (e) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      {
        !isloading ?(<CircularProgress />):(<>{children}</>)
      }
    </>
  );
};


export default SecurityLayout;

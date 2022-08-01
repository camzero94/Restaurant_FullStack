import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
const Entry = () => {
  const [login, setlogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (login) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, []);

  return <></>;
};

export default Entry;

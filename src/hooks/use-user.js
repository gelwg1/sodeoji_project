import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';

export default function useUser(Username) {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    async function getUserObjByUsername(Username) {
      const user = await getUserByUsername(Username);
      setActiveUser(user || {});
    }

    if (Username) {
      getUserObjByUsername(Username);
    }
  }, [Username]);

  return { user: activeUser, setActiveUser };
}

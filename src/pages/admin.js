import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Sidebar from '../components/admin/sidebar'
import { useParams } from "react-router-dom";

export default function Dashboard({ user: loggedInUser }) {
  const { user, setActiveUser } = useUser(loggedInUser.uid);
  var { type, param2 } = useParams();

  useEffect(() => {
    document.title = 'Admin page';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3-new">
          <Sidebar />
          {type === 'quizz' &&
            <div>
            day la quizz
            </div> 
          }
          {!type  &&
            <div>
            day la user
            </div> 
          }
        </div>
      </div>
    </LoggedInUserContext.Provider >
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
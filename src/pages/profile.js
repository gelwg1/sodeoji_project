import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import "firebase/auth";
import "./../styles/profile.css";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();
  

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user?.user_id) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
      //console.log(user);
    }

    checkUserExists();
    document.title = 'プロフィール';
  }, [username, history]);

  return user?.username ? (
  <>
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg" style={{paddingTop: 10 + 'px', paddingBottom: 10 + 'px'}}>
        <UserProfile user={user} />
      </div>
    </div>
    <div className="show-profile">
      <div className="show-profile-child first-child">
        <h3>個人情報</h3>
      </div>
      <hr />
      <div className="show-profile-child">
        <h3>名前 <span>{user.username}</span></h3>
      </div>
      <div className="show-profile-child last-child">
        <h3>グループ <span>{user.group}</span></h3>
      </div>
    </div>
  </>
  ) : null;
}
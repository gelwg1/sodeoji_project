import PropTypes from 'prop-types';
import { Dropdown} from 'react-bootstrap';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import { useContext, useState } from 'react';
import FirebaseContext from '../../context/firebase';

export default function Header({ username, avatarSrc, date, content }) {
  var today = new Date(date);
  
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { database } = useContext(FirebaseContext);
  
  const handleDelete =  async () => {
    await database.ref('Posts').child(content.key).remove();
  };

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex justify-center items-center" style={{width: "100%"}}>
        <img
          className="rounded-full w-thanh flex mr-3"
          src={avatarSrc}
          alt={`Avatar`}
        />
        <p className="font-bold">{date} by {username}</p>
        <div clsaaName="flex-end" style={{marginLeft: "auto", order: "2"}}>
        { user?.username == username &&
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">投稿の編集</Dropdown.Item>
              
              <Dropdown.Item onClick={handleDelete}>投稿の削除</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
        </div>
      </div>
    </div>
    
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired
};

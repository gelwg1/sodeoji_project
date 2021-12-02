import PropTypes from 'prop-types';
import { Dropdown} from 'react-bootstrap';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import { useContext, useState } from 'react';
import FirebaseContext from '../../context/firebase';
import EditPostInfor from './edit-post';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

const DialogActions = withStyles((theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Header({ username, avatarSrc, date, content }) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { database } = useContext(FirebaseContext);

  const handleDelete =  async () => {
    await database.ref('Posts').child(content.key).remove();
    window.location.reload();
  };
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex justify-center items-center" style={{width: "100%"}}>
        <img
          className="rounded-full w-thanh flex mr-3"
          src={avatarSrc}
          alt={`Avatar`}
        />
        <p className="font-bold mr-3">{date} by {username}</p>
        <div clsaaName="flex-end" style={{marginLeft: "auto", order: "2"}}>
        { user?.username == username &&
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`#/post-detail/${content.key}/edit`}>
                <li onClick={handleClickOpen}> 投稿の編集 </li>
                <Dialog open={open}>
                  <DialogActions>
                    <EditPostInfor content={content} handleClose={handleClose} />
                  </DialogActions>
                </Dialog>
              </Dropdown.Item>
              
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

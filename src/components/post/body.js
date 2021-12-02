import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import PostDetail from './post-detail';

const DialogActions = withStyles((theme) => ({
  root: {
      margin: 0,
      padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Body({ postId, title, content, post }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };

  return (
    <div className="p-4 pt-2 pb-1">
      <a className="font-bold text-black-light" onClick={handleClickOpen}>
         {title}
          <Dialog open={open}>
            <DialogActions>
              <PostDetail post={post} handleClose={handleClose} />
            </DialogActions>
          </Dialog>
      </a>
      <p className="italic">{content}</p>
    </div>
  );
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

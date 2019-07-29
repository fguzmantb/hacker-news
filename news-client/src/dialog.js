import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { deleteNew } from './news/newsService';

export function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const title = props.nodeNew.title;
  const author = props.nodeNew.author;
  const id = props.nodeNew._id;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);    
  }

  function handleDelete() {
    deleteNew(id, response => {
        if(response) {
            props.onClick(id);
        }
    });        
    setOpen(false);
  }

  return (
    <div>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon fontSize="small" />
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-title">{"Delete Node News"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this new 
                    "<b>{title}</b>" by <b>{author}</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant="contained" color="secondary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}

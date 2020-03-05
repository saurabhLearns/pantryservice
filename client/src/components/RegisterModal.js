import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
	menuText:{
		width: 100,
	}
  }));

export default function RegisterModal() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button color="inherit" onClick={handleClickOpen} className={classes.menuText} >
				Register
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Register to continue</DialogTitle>
				<DialogContent>
				<DialogContentText>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="email"
					label="Email Address"
					type="email"
					fullWidth
				/>
				<TextField
					margin="dense"
					id="password"
					label="Password"
					type="password"
					fullWidth
				/>
				</DialogContent>
				<DialogActions>
				<Button onClick={handleClose} color="primary">
					Signup
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

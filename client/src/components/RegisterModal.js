import React from 'react';
import {
	Button, 
	TextField, 
	Dialog, 
	DialogActions, 
	MenuItem, 
	DialogContent, 
	DialogContentText, 
	DialogTitle
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';



export default function RegisterModal() {
	const [openReg, setOpenReg] = React.useState(false);

	const handleClickOpenReg = () => {
		setOpenReg(true);
	};

	const handleCloseReg = () => {
		setOpenReg(false);
	};

	return (
		<div>
			
			<MenuItem onClick={handleClickOpenReg}>Register New User</MenuItem>
			<Dialog open={openReg} onClose={handleCloseReg} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Register to continue</DialogTitle>
				<DialogContent>
				<DialogContentText>
				<MuiAlert elevation={1} variant="filled" severity="error">error</MuiAlert>
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
					<Button onClick={handleCloseReg} color="primary">Signup</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

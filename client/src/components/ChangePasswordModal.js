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
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';



export default function ChangePasswordModal() {
	const [openPwd, setOpenPwd] = React.useState(false);

	const handleClickOpenPwd = () => {
		setOpenPwd(true);
	};

	const handleClosePwd = () => {
		setOpenPwd(false);
	};

	return (
		<div>
			{/* <Button color="inherit" onClick={handleClickOpenReg} className={classes.menuText} >
				Register
			</Button> */}
			<MenuItem onClick={handleClickOpenPwd}>Change Password</MenuItem>
			<Dialog open={openPwd} onClose={handleClosePwd} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Change Password</DialogTitle>
				<DialogContent>
				<DialogContentText>
				<MuiAlert elevation={2} variant="filled" severity="error">error</MuiAlert>
				</DialogContentText>
				<TextField
					margin="normal"
					id="oldpassword"
					label="Old Password"
					type="oldpassword"
					fullWidth
				/>
				<TextField
					margin="normal"
					id="newpassword"
					label="New Password"
					type="password"
					fullWidth
				/>
				<TextField
					margin="normal"
					id="newpassword1"
					label="Type again to confirm"
					type="password"
					fullWidth
				/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClosePwd} color="primary">Change</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

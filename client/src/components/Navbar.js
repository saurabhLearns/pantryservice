import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { 
	IconButton, 
	Typography, 
	Container, 
	Toolbar, 
	AppBar,
	Menu,
} from '@material-ui/core';

import RegisterModal from './RegisterModal'
import Logout from './Logout'
import ChangePasswordModal from './ChangePasswordModal'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuText:{
		width: 'auto',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: "#ffffff"
	},
	title: {
		flexGrow: 1,
	},
	Greettitle: {
		marginLeft: theme.spacing(2),
		flex: 1,
	  },
}));



export default function ButtonAppBar() {
	const classes = useStyles();

	//hooks
	const [anchorEl, setAnchorEl] = React.useState(null);
  	const openAnchor = Boolean(anchorEl);

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClose = () => {
		setAnchorEl(null);
	};
 
	return (
		<div className={classes.root}>
			<AppBar position ="relative">
				<Toolbar>

					<Typography variant="h6" className={classes.title}>
						Pantry Management
					</Typography>

						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
								>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								open={openAnchor}
								onClose={handleClose}
							>

								<RegisterModal/>
								<ChangePasswordModal/>
								<Logout/>
							</Menu>
						</div>	
				</Toolbar>
			</AppBar>
			<br/>
			<Container>
				<Typography variant="h4" className={classes.Greettitle}>Hello user!</Typography>
			</Container>
		</div>
	);
}
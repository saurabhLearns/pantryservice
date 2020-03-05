import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';


import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

//styles
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: "#ffffff"
	},
	title: {
		flexGrow: 1,
	},

}));


//implementation and rendering
export default function ButtonAppBar() {
  	const classes = useStyles();

	//hooks, gonna be headache
	const [state, setState] = React.useState({
		top: false,
	});
	
	//drawer toggler
	const toggleDrawer = (side, open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		return;
		}
		setState({ ...state, [side]: open });
	};

	//render
	return (
		<div className={classes.root}>
		<AppBar position ="relative">
			<Toolbar>
			<Hidden mdUp>
				<Button onClick={toggleDrawer('left', true)} >
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
				</Button>
				<SwipeableDrawer open={state.left} onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}>
					<div>
						<LoginModal/>
						<RegisterModal/>
					</div>
				</SwipeableDrawer>
			</Hidden>
			<Typography variant="h6" className={classes.title}>
				Pantry Management
			</Typography>
			<Hidden smDown>
					<LoginModal/>
					<RegisterModal/>	
			</Hidden>
			</Toolbar>
		</AppBar>
		</div>
	);
}
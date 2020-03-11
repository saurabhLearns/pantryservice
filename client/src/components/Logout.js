import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
 
const useStyles = makeStyles({
	menuText:{
		width: 100,
	}
  });

export default function Logout(){
	const classes = useStyles();
	return(
		<Fragment>
			<Button color="inherit" onClick={null} className={classes.menuText} >
				Logout
			</Button>
		</Fragment>
	)
}

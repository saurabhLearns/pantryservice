import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
	paper:{
		flexWrap: 'wrap',
		padding: theme.spacing(2),
	},
  })); 

export default function LoginModal() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		checkedA: false,
	  });
	  
	const handleCheckChange  = event => {
		setState({ 
			...state, 
			checkedA: event.target.checked 
		});
	  }; 


	return (
		<div>
			<Grid container justify="flex-end" alignItems="center">
				<Grid item xs={12} sm={5}>
					<Paper className={classes.paper} >
						<Typography variant = 'h5'>Login to continue</Typography><br/>
						<MuiAlert elevation={2} variant="filled" severity="error">error</MuiAlert><br/>
						<TextField
							autoFocus
							margin="normal"
							id="email"
							label="Email Address"
							type="email"
							fullWidth
						/>
						<TextField
							margin="normal"
							id="password"
							label="Password"
							type="password"
							fullWidth
						/><br/><br/>
						<FormControlLabel
							control={
								<Switch 
								checked={state.checkedA} 
								onChange={handleCheckChange} 
								value="isAdmin" />
							}
							label="I am admin"
						/>
						<br/> <br/>
						<Button color="primary" size='large' variant ="contained">Login</Button>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

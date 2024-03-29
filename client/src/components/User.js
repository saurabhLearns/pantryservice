import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
	TextField,
	Grid,
	Paper
} from '@material-ui/core';

import 'normalize.css'

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
		  margin: theme.spacing(1),
		  maxWidth: 300,
		},
	  },
	formControl: {
	  margin: theme.spacing(1),
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
	paper:{
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		whiteSpace: 'nowrap',
		marginBottom: theme.spacing(2),
		minHeight: 200,
	},
  }));

export default function User() {

	const classes = useStyles();
	const [defaultchoice, setdefaultchoice] = React.useState('');
	const handleChange = event => {
		setdefaultchoice(event.target.value);
	};
	return (
		<div>
			
			<br/>	
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<form>
						<Paper className={classes.paper}>
							<FormControl className={classes.formControl}>
								<InputLabel shrink id="defaultchoice">Your Default Choice</InputLabel>
								<Select
								labelId="defaultchoice"
								id="defaultchoice"
								value={defaultchoice}
								onChange={handleChange}
								displayEmpty 
								className = {classes.selectEmpty}
								>
								<MenuItem value={''}>Default will appear here</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
								</Select>								
							</FormControl>
							<br/><br/>
							<Button variant="contained">Update Default Choice</Button>
						</Paper>
					</form>
				</Grid>

				<Grid item xs={12} md={6} className={classes.gridDiv}>
					<Paper className={classes.paper}>
						<form noValidate autoComplete="off">
							<div className={classes.root} >
								<TextField id="standard-basic" multiline="true" fullWidth="true" rows="4" variant='filled' label="Special Requirements today?" />
							</div>
							<br/>
							<Button variant="contained">Submit</Button>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</div>
  );
}

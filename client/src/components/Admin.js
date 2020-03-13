import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button, 
  Dialog, 
  ListItem, 
  ListItemText, 
  List, 
  Divider, 
  AppBar,
  Toolbar, 
  IconButton, 
  Typography, 
  Slide, 
  Grid, 
  Paper
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  div:{
    alignItems: 'center',
    justify:'center'
  },
  list:{
    overflow: 'auto',
    maxHeight: 350,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function Admin() {
  const classes = useStyles();
  var changeModal = {
    tea: false,
    coffee: false
  }
  const [open, setOpen] = React.useState(changeModal);

  const handleClickOpen= name => (event) => {
    setOpen({
      ...open,
      [name] : !event.target.open
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <br/>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" className={classes.title}>
            Todays's orders:
          </Typography><br/>
          <div className = {classes.div}>
            <Button variant="outlined" color="primary" size="large" onClick={handleClickOpen('tea')}>
              Tea: 2
            </Button>
            <Dialog fullScreen open={open.tea} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Tea: 2
                  </Typography>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem>
                  <ListItemText primary="User1"/>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="User2"/>
                </ListItem>
              </List>
            </Dialog>
            <br/><br/>
            <Button variant="outlined" color="primary" size="large" onClick={handleClickOpen('coffee')}>
              coffee: 3
            </Button>
            <Dialog fullScreen open={open.coffee} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    coffee: 3
                  </Typography>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem>
                  <ListItemText primary="User1"/>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="User2"/>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="User3"/>
                </ListItem>
              </List>
            </Dialog>
          </div>
          
        </Grid>
        <Grid item xs ={12} sm={6}>
          <Typography variant="h5" className={classes.title}>
            Todays's Special requirements:
          </Typography><br/>
          <Paper elevation ={1}>
            <List className={classes.list}>
              <ListItem>
                <ListItemText primary="User1" secondary="UserRequirement1" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem><Divider />
              <ListItem>
                <ListItemText primary="User2" secondary="USerRequirement 2" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
        
    </div>
  );
}
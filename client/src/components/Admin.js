import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


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
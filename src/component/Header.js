import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      team_name: null
    }
  }

  componentWillReceiveProps = async(nextProps)=>{
    //console.log("header update.")
    //console.log(nextProps);
    this.setState({team_name: nextProps.team_name});
  }

  render(){
    const {classes} = this.props;
   // console.log("header render");
    return (
      <React.Fragment>
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h4">
                  {this.state.team_name}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Help yourself." >
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);

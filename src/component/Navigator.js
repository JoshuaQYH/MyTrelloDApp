import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AddTaskIcon from '@material-ui/icons/AddBox';
import AddMemberIcon from '@material-ui/icons/Add'
import DeleteMemberIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router';

const categories = [
  {
    id: 'Task List',
    children: [
      { id: 'Show Tasks', icon: <PeopleIcon />, path: '/taskinfo', active: false },
      { id: 'Add Task', icon: <AddTaskIcon />, path: '/addtask', active: false},
    ],
  },
  {
    id: 'Member List',
    children: [
      { id: 'Member Info', icon: <PeopleIcon />, path: '/memberInfo', active:false},
      { id: 'Add Member', icon: <AddMemberIcon />, path: '/addmember', active: false },
      { id: 'Fire Member ', icon: <DeleteMemberIcon/>, path: '/firemember', active: false},
    ],
  },
  {
    id: 'Vote',
    children: [
      { id: 'Vote To Member', icon: <PeopleIcon />, path: '/voteto', active:false},
      { id: 'Vote Setting', icon: <PeopleIcon />, path: '/setvote', active:false},
   
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #000000 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
          MyTrello DApp
        </ListItem>
        <ListItem className={classNames(classes.item, classes.itemCategory)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Overview
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path, active }) => (
              <Link to = {path}>              
                <ListItem
                  button
                  dense
                  key={childId}
                  className={classNames(
                    classes.item,
                    classes.itemActionable,
                    active && classes.itemActiveItem,
                  )}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme:any) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

type TopbarProps = {
    className?:string,
    onSidebarOpen:()=>void
}

const Topbar:React.FC<TopbarProps> = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            className="responsive"
            src="/images/logos/logo-chiofer.png"
          />
        </RouterLink>

        <div className={classes.flexGrow} />
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

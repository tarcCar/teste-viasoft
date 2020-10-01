import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InputIcon from '@material-ui/icons/Input';

import SidebarNav from './SidebarNav';

const useStyles = makeStyles((theme:any) => ({
  drawer: {
    width: 240,
    marginTop: 64,
    height: 'calc(100% - 64px)',
  },
  root: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

type SidebarProps={
    open:boolean,
    variant:'permanent' | 'persistent' | 'temporary' | undefined,
    onClose:()=>void,
    className?:string
}

const Sidebar:React.FC<SidebarProps> = (props) => {
  const {
    open, variant, onClose, className, ...rest
  } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/',
      icon: <HomeIcon />,
    },
    {
      title: 'Cadastrar FeedBack',
      href: '/feedback/cadastro',
      icon: <InputIcon />,
    },
    {
      title: 'Sair',
      href: '/login',
      icon: <InputIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;

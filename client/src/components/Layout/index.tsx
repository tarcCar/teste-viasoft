import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Sidebar from './SideBar';
import Topbar from './Topbar';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    height: '100%',
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

type LayoutProps = {
    children:React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyles();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div
      className={classes.root}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
      />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

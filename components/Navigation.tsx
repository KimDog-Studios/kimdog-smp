import React, { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';

const Navigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = (
    <>
      <Button color="inherit">
        <Link href="/" className="text-white no-underline hover:text-gray-400 transition-colors duration-300">
          Home
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/store" className="text-white no-underline hover:text-gray-400 transition-colors duration-300">
          Store
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/servers" className="text-white no-underline hover:text-gray-400 transition-colors duration-300">
          Servers
        </Link>
      </Button>
      <Button color="inherit" onClick={handleMenuClick}>
        <Link href="/applications" className="text-white no-underline hover:text-gray-400 transition-colors duration-300">
          Applications  
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/contact" className="text-white no-underline hover:text-gray-400 transition-colors duration-300">
          Contact
        </Link>
      </Button>
    </>
  );

  return (
    <>
      <AppBar position="fixed" className="bg-gray-800">
        <Toolbar className="container mx-auto flex justify-between items-center">
          <Typography variant="h6" className="text-white">
            <Link href="/" className="text-white no-underline">
              KimDog's SMP
            </Link>
          </Typography>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  {navLinks}
                </List>
              </Drawer>
            </>
          ) : (
            <div className="flex space-x-6 ml-auto">
              {navLinks}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This Toolbar is used to offset the content below the fixed AppBar */}
      <footer className="text-center py-4 border-t border-gray-700 mt-auto bg-gray-800 text-white">
        <Typography variant="body2">
          &copy; 2025 KimDog SMP. All rights reserved. 
        </Typography>
        <Link href="https://github.com/KimDog-Studios/kimdog-smp" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center justify-center">
          <EditIcon className="mr-2" />
          Edit this page on GitHub
        </Link>
      </footer>
    </>
  );
};

export default Navigation;
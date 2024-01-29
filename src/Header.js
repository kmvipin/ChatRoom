import React from 'react';
import {FiMenu} from 'react-icons/fi';
import { AppBar, Toolbar, IconButton, Typography, Button, Fade } from '@mui/material';

function Header(props) {
    const { onLogout, showLogout} = props;
    return (
        <div>
          <AppBar position="static">
            <Toolbar className='p-0'>
              <IconButton  color="inherit" aria-label="Menu">
                <FiMenu />
              </IconButton>
                <Typography variant="title" color="inherit" style={{marginLeft:"auto", display:showLogout?"none":"block"}}>
                  Chat Application
                </Typography>
              <Fade in={showLogout} style={{marginLeft:'auto'}}>
                <Button color="inherit" onClick={() => onLogout()}>
                  Logout
                </Button>
              </Fade>
            </Toolbar>
          </AppBar>
        </div>
      );
}

export default Header;
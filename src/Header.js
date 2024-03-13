import React from 'react';
import {FiMenu} from 'react-icons/fi';
import {IconButton, Button} from '@mui/material';

function Header(props) {
    const { onLogout, showLogout} = props;
    return (
        <div>
          <div position="static" className="shadow-none border-none">
            <div className='p-0' className="bg-gray-100 text-black flex justify-between px-5 h-12 md:px-20 lg:px-28">
              <IconButton  color="inherit" aria-label="Menu">
                <FiMenu />
              </IconButton>
                {!showLogout ? <div className="self-center"><h1 variant="title" color="inherit">
                  Chat Application
                </h1></div>:
              <div className="self-center">
                <button className="border border-gray-500 text-black px-3 py-1 
                rounded-md hover:bg-gray-800 hover:text-white" onClick={() => onLogout()}>
                  Logout
                </button>
              </div>}
            </div>
          </div>
        </div>
      );
}

export default Header;
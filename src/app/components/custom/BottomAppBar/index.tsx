import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const BottomAppBar: React.FC = (props:any) => {
  return (
    <AppBar
      position="fixed"
      style={{
        bottom: 0,
        top: 'auto',
        // left: 200,  // Ensures it doesn't overlap with the sidebar
        width: `calc(100% - ${220}px)`,
      }}
    >
      <Toolbar>
        { props.children}
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;
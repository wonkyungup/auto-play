import * as React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import MenuList from '@mui/material/MenuList';

interface TypeContent {
  onMouseLeave: () => void;
  children: any;
}

const Content = ({ onMouseLeave, children }: TypeContent) => {
  return (
    <Card
      onMouseLeave={onMouseLeave}
      sx={{
        position: 'absolute',
        pointerEvents: 'all',
        width: 200,
        left: 50,
        top: 33,
      }}
    >
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>{children}</MenuList>
      </Paper>
    </Card>
  );
};

export default Content;

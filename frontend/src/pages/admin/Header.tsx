import {
  Box, Paper, Tab, Tabs, Typography,
} from '@mui/material';

import React from 'react';

type Props = {
  name:string
};

function Header(props:Props) {
  const { name } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box sx={{
        height: '100%',
        bgcolor: 'primary.main',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        mr: 1,
      }}
      >
        <Typography fontWeight="bold" color="common.white">
          {name}
        </Typography>
      </Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="All " id="0" />
        <Tab label="Not Passed" id="1" />
        <Tab label="Passed" id="2" />
      </Tabs>
    </Paper>
  );
}

export default Header;

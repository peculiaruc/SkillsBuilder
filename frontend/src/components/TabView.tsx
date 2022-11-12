import {
  Box, Paper, Tab, Tabs, Typography,
} from '@mui/material';
import React, { useState } from 'react';

type TabItem = {
  name: string,
  component: React.ReactNode,
};

type TabViewProps = {
  title: string,
  tabs: TabItem[]
};
function TabView(props: TabViewProps) {
  const { title, tabs } = props;

  const [tab, setTtab] = useState<TabItem>(tabs[0] as TabItem);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTtab(tabs.find((t) => t.name === newValue) as TabItem);
  };

  const renderTab = (t: TabItem) => (
    <Tab
      label={t.name}
      value={t.name}
      id={t.name}
      key={t.name}
    />
  );

  const TabHeader = (
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
          {title}
        </Typography>
      </Box>
      <Tabs value={tab?.name} onChange={handleChange}>
        {tabs.map(renderTab)}
      </Tabs>
    </Paper>
  );

  return (

    <>
      {tabs.length && TabHeader}
      {tab?.component}
    </>

  );
}

export default TabView;

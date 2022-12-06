import {
  Box, Divider, Drawer, Stack, Toolbar,
} from '@mui/material';
import { EmojiObjects, School } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import { drawerWidth } from '../../theme/theme';
import { useAuth } from '../../store/authReducer';

function Sidebar() {
  const location = useLocation();

  const auth = useAuth();

  return (
    <Box sx={{ width: { md: drawerWidth }, height: '100vh', position: 'fixed' }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100%',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            height: '100%',
            bgcolor: 'primary.main',
            position: 'inherit',
          },
        }}
        open
      >
        <Toolbar />
        <Stack>
          {auth.user.role < 1 && (
          <>
            <MenuItem path="" name="Learning Center" icon={<School fontSize="large" sx={{ color: 'common.white' }} />} />
            <MenuItem path="/" name="Home" active={location.pathname === '/'} />
            <MenuItem path="/my-courses" name="My Cources" active={location.pathname === '/my-courses'} />
            <MenuItem path="/my-assignments" name="My Assignments" active={location.pathname === '/my-assignments'} />
            <MenuItem path="/my-study-plan" name="My Study plan" active={location.pathname === '/my-study-plan'} />
            <MenuItem path="/my-groups" name="My Groups" active={location.pathname === '/my-groups'} />
          </>
          )}
          {auth.user.role > 0 && (
          <>
            <Divider />
            <MenuItem path="" name="Creation Center" icon={<EmojiObjects fontSize="large" sx={{ color: 'common.white' }} />} />
            <MenuItem path="/admin/overview" name="Overview" active={location.pathname === '/admin/overview'} />
            {
              auth.user.role === 1 ? (
                <MenuItem path="/admin/courses/me" name="Courses" active={location.pathname === '/admin/courses/me'} />
              )
                : (<MenuItem path="/admin/courses" name="Courses" active={location.pathname === '/admin/courses'} />)
            }

            <MenuItem path="/admin/assignments" name="Assignments" active={location.pathname === '/admin/assignments'} />
            <MenuItem path="/admin/groups" name="Groups" active={location.pathname === '/admin/groups'} />
            {auth.user.role > 1 && (
              <MenuItem path="/admin/users" name="Users" active={location.pathname === '/admin/users'} />
            )}
          </>
          )}

        </Stack>
      </Drawer>
    </Box>
  );
}

export default Sidebar;

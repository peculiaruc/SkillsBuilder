import React from 'react';
import {
  alpha, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePalette } from '../../theme/theme';

type Props = {
  name: React.ReactNode | undefined,
  path: string,
  active?: boolean,
  icon?: React.ReactNode | undefined,
};

const ItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme, selected }) => ({
  backgroundColor: selected ? alpha(theme.palette.background.default, 0.1).concat(' !important') : 'transparent',
  borderRight: `8px solid ${selected ? theme.palette.background.default : 'transparent'}`,
}));

function MenuItem(props: Props) {
  const {
    active, name, path, icon,
  } = props;

  const palette = usePalette();

  const navigate = useNavigate();

  return (
    <ItemButton selected={active} onClick={() => navigate(path)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ color: palette.primary.contrastText, fontWeight: 'bold' }}>
        {name}
      </ListItemText>
    </ItemButton>
  );
}

MenuItem.defaultProps = {
  active: false,
  icon: '',
};

export default MenuItem;

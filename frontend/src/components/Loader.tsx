import { Box } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import { usePalette } from '../theme/theme';

export default function Loader() {
  const palette = usePalette();
  return (
    <Box sx={{
      width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <ThreeDots
        height="20"
        width="100%"
        radius="9"
        color={palette.primary.main}
        ariaLabel="three-dots-loading"
        visible
      />
    </Box>
  );
}

export function LoaderButton() {
  const palette = usePalette();
  return (
    <ThreeDots
      height="20"
      width="100%"
      radius="9"
      color={palette.primary.main}
      ariaLabel="three-dots-loading"
      visible
    />
  );
}

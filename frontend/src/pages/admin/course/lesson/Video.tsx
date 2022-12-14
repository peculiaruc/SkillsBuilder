import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Stack } from '@mui/material';
import { CLOUDINARY_NAME } from '../../../../configs/app';
import { MediaType } from '../../../../interfaces/MediaType';

export default function Video({ content_title } : Partial<MediaType>) {
  const cloud = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_NAME,
    },
  });
  const video = cloud.video(content_title);

  return (
    <Stack sx={{ width: '100%', maxHeight: '600' }}>
      <AdvancedVideo cldVid={video} controls />
    </Stack>
  );
}

/* eslint-disable @typescript-eslint/naming-convention */
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteMediaMutation, useUpdateMediaMutation } from '../../../../apiServices/mediaService';
import MixedForm from '../../../../components/forms/MixedForm';
import { LoaderButton } from '../../../../components/Loader';
import { CLOUDINARY_NAME } from '../../../../configs/app';
import { MediaType } from '../../../../interfaces/MediaType';
import LessonMedia from '../../../../models/LessonMedia';
import { useAuth } from '../../../../store/authReducer';

export default function Video(props : Partial<MediaType>) {
  const { content_title, id } = props;
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [updateMedia, { isLoading: isUpdating }] = useUpdateMediaMutation();
  const [deleteMedia, { isLoading }] = useDeleteMediaMutation();
  const cloud = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_NAME,
    },
  });
  const video = cloud.video(content_title);
  video.roundCorners(byRadius(10));
  const handleDeleteContent = async () => {
    const res = await deleteMedia(Number(id)).unwrap();
    toast(res.message);
  };
  return edit ? (
    <MixedForm
      dialog={false}
      title="Update Position"
      mutation={updateMedia}
      model={new LessonMedia({ ...props })}
      loading={isUpdating}
      onCancel={() => setEdit(false)}
    />
  ) : (
    <Stack sx={{ width: '100%', maxHeight: '600', position: 'relative' }}>
      {user.role > 0 && (isLoading ? <LoaderButton />
        : (
          <Stack
            sx={{
              position: 'absolute',
              top: 0,
              right: 2,
              cursor: 'pointer',
              zIndex: 10000,
            }}
            spacing={1}
          >
            <IconButton
              sx={{ bgcolor: 'common.white' }}
              color="success"
              size="small"
              onClick={() => setEdit(true)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{ bgcolor: 'common.white' }}
              color="error"
              size="small"
              onClick={handleDeleteContent}
            >
              <DeleteForever />
            </IconButton>
          </Stack>
        )
      )}
      <AdvancedVideo cldVid={video} controls />
    </Stack>
  );
}

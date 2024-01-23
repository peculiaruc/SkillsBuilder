/* eslint-disable @typescript-eslint/naming-convention */
import { AdvancedImage } from '@cloudinary/react';
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

export default function Image(props: Partial<MediaType>) {
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
  const image = cloud.image(content_title);
  image.roundCorners(byRadius(8));
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
    <Stack width="100%" sx={{ position: 'relative' }}>
      {user.role > 0 && (isLoading ? <LoaderButton />
        : (
          <Stack
            sx={{
              position: 'absolute',
              top: 0,
              right: 2,
              cursor: 'pointer',
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
      <AdvancedImage cldImg={image} />
    </Stack>
  );
}

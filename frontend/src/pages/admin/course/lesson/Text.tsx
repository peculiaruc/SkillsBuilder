/* eslint-disable react/no-danger */
import { DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteMediaMutation, useUpdateMediaMutation } from '../../../../apiServices/mediaService';
import MixedForm from '../../../../components/forms/MixedForm';
import { LoaderButton } from '../../../../components/Loader';
import { MediaType } from '../../../../interfaces/MediaType';
import LessonText from '../../../../models/LessonText';
import { useAuth } from '../../../../store/authReducer';

export default function Text(props : Partial<MediaType>) {
  const { content, id } = props;
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);
  const [deleteMedia, { isLoading }] = useDeleteMediaMutation();
  const [updateMedia, { isLoading: isUpdating }] = useUpdateMediaMutation();
  const handleDeleteContent = async () => {
    const res = await deleteMedia(Number(id)).unwrap();
    toast(res.message);
  };

  return (
    edit ? (
      <MixedForm
        dialog={false}
        title="Update text"
        mutation={updateMedia}
        model={new LessonText({ ...props })}
        loading={isUpdating}
        onCancel={() => setEdit(false)}
      />
    )
      : (
        <Stack sx={{
          width: '100%',
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 2,
        }}
        >
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
                <IconButton color="success" size="small" onClick={() => setEdit(true)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" size="small" onClick={handleDeleteContent}>
                  <DeleteForever />
                </IconButton>
              </Stack>
            )
          )}
          <div dangerouslySetInnerHTML={{ __html: content as string }} />
        </Stack>
      )
  );
}

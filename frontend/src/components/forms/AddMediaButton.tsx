import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateMediaMutation } from '../../apiServices/mediaService';
import { CLOUDINARY_NAME, CLOUDINARY_PRESET } from '../../configs/app';
import { MediaType } from '../../interfaces/MediaType';
import LessonText from '../../models/LessonText';
import { LoaderButton } from '../Loader';
import MixedForm from './MixedForm';

export default function AddMediaButton() {
  const { id } = useParams();
  const [createContent, { isLoading }] = useCreateMediaMutation();
  const createMedia = async (_err: unknown, {
    public_id,
    resource_type,
    secure_url,
  }: Record<string, string>) => {
    if (public_id) {
      const res = await createContent({
        content_title: public_id,
        content_type: resource_type,
        content: secure_url,
        lesson_id: Number(id),
      } as MediaType).unwrap();
      toast(res.message);
    }
  };

  const widget = window.cloudinary.createUploadWidget({
    cloudName: CLOUDINARY_NAME,
    uploadPreset: CLOUDINARY_PRESET,
  }, createMedia);
  const handleUpload = () => widget.open();
  return (
    isLoading ? <LoaderButton /> : (
      <Stack spacing={2} direction="row">
        <Button onClick={handleUpload}>Add Media</Button>
        <MixedForm
          dialog
          title="Add Text"
          mutation={createContent}
          model={new LessonText({ lesson_id: id })}
        />
      </Stack>
    )
  );
}

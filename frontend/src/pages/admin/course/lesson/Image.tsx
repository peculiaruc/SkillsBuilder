import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUDINARY_NAME } from '../../../../configs/app';
import { MediaType } from '../../../../interfaces/MediaType';

export default function Image({ content_title } : Partial<MediaType>) {
  const cloud = new Cloudinary({
    cloud: {
      cloudName: CLOUDINARY_NAME,
    },
  });
  const image = cloud.image(content_title);

  return (
    <AdvancedImage cldImg={image} />
  );
}

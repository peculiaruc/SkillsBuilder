/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaType } from '../../../../interfaces/MediaType';
import Image from './Image';
import Video from './Video';

type Props = {
  content: MediaType
};

export default function LessonContentItem({ content: media }: Props) {
  const { content_type, content } = media;
  if (content_type === 'video') return <Video {...media} />;
  if (content_type === 'image') return <Image {...media} />;
  return (
    <div dangerouslySetInnerHTML={{ __html: content as string }} />
  );
}

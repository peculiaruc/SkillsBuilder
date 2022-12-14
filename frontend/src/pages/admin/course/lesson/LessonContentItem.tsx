/* eslint-disable @typescript-eslint/naming-convention */
import { MediaType } from '../../../../interfaces/MediaType';
import Image from './Image';
import Text from './Text';
import Video from './Video';

type Props = {
  content: MediaType
};

export default function LessonContentItem({ content: media }: Props) {
  const { content_type } = media;
  if (content_type === 'video') return <Video {...media} />;
  if (content_type === 'image') return <Image {...media} />;
  return (
    <Text {...media} />
  );
}

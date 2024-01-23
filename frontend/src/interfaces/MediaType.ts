import { ResponseType } from './ResponseType';

export type MediaType = {
  id: number,
  content_title: string,
  content_position: number,
  content: string | Record<string, unknown>,
  content_type:string,
  lesson_id: number,
  created_at: Date,
  updated_at: Date
};

export type MediaId = number;

export type CreateMediaRequest = Omit<MediaType, 'id' | 'created_at' | 'updated_at'>;

export type CreateMediaResponse = ResponseType & {
  data: {
    media: MediaType
  }
};

export type GetMediaRequest = MediaId;
export type GetMediasResponse = ResponseType & {
  data: {
    medias: MediaType[]
  }
};
export type GetMediaResponse = ResponseType & {
  data: {
    medias: MediaType
  }
};
export type DeleteMediaRequest = MediaId;
export type DeleteMediaResponse = ResponseType;
export type UpdateMediaRequest = MediaType;
export type UpdateMediaResponse = CreateMediaResponse;

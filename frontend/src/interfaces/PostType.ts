import { ResponseType } from './ResponseType';

export type PostType = {
  id: number,
  title: string,
  content: string,
  owner_id: number,
  group_id: number,
  created_at: Date,
  updated_at: Date
};

export type PostId = number;

export type CreatePostRequest = Omit<PostType, 'id' | 'created_at' | 'updated_at'>;

export type CreatePostResponse = ResponseType & {
  data: {
    post: PostType
  }
};
export type GetPostRequest = PostId;
export type GetPostResponse = CreatePostResponse;
export type DeletePostRequest = PostId;
export type DeletePostResponse = ResponseType;
export type UpdatePostRequest = PostType;
export type UpdatePostResponse = CreatePostResponse;

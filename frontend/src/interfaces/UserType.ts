import { AssignmentType } from './AssignmentType';
import { PostType } from './PostType';
import { ResponseType } from './ResponseType';

export type UserId = number;

export type UserType = {
  id: UserId,
  fullname: string,
  email: string,
  password: string,
  rememberMe?: boolean,
  picture: string,
  phone: string,
  city: string,
  country: string,
  telegram: string,
  whatsapp: string,
  linkedin: string,
  github: string,
  role: number,
};

export type CredentialsType = {
  email: string,
  password: string,
  rememberMe?: boolean
};

export type UserRegisterType = Pick<UserType, 'fullname' | 'email' | 'city' | 'phone' | 'password'>;

export type UserTypeId = number;

export type CreateUserRequest = Omit<UserType, 'id' | 'created_at' | 'updated_at'>;

export type CreateUserResponse = ResponseType & {
  data: {
    post: UserType
  }
};
export type GetUserRequest = UserId;
export type GetUserResponse = CreateUserResponse;
export type GetAllUsersResponse = ResponseType & {
  data: {
    users: UserType[]
  }
};
export type DeleteUserResponse = ResponseType;
export type UpdateUserResponse = CreateUserResponse;

export type GetUserPostsResponse = ResponseType & {
  data: {
    posts: PostType[]
  }
};

export type GetMyAssignmentsResponse = ResponseType & {
  data: {
    assignments: AssignmentType[]
  }
};

export type GetMyLearnersResponse = ResponseType & {
  data: {
    learners: UserType[]
  }
};

export type GetAllAuthorsResponse = ResponseType & {
  data: {
    authors: UserType[]
  }
};

export type GetAllLearnersResponse = ResponseType & {
  data: {
    learners: UserType[]
  }
};

export type GetAllAdminsResponse = ResponseType & {
  data: {
    admins: UserType[]
  }
};

export type GetCourseLearnersResponse = GetAllUsersResponse;

export type GetCourseAuthorResponse = ResponseType & {
  data:{
    author: UserType,
  }
};

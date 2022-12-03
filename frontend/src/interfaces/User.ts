import { CourseType } from './Course';
import { ResponseType } from './ResponseType';
import { GroupType } from './GroupTypes';
import { PostType } from './PostType';
import { AssignmentType } from './AssignmentType';

export type UserType = {
  id: number,
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

export type UserId = number;

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
export type GetAllUsersRequest = void;
export type GetAllUsersResponse = ResponseType & {
  data: {
    users: UserType[]
  }
};
export type DeleteUserRequest = UserId;
export type DeleteUserResponse = ResponseType;
export type UpdateUserRequest = UserType;
export type UpdateUserResponse = CreateUserResponse;

export type GetMyCoursesRequest = UserId;

export type GetMyCoursesResponse = ResponseType & {
  data: {
    courses: CourseType[]
  }
};

export type GetMyGroupsRequest = UserId;

export type GetMyGroupsResponse = ResponseType & {
  data: {
    groups: GroupType[]
  }
};

export type GetMyPostsRequest = UserId;

export type GetMyPostsResponse = ResponseType & {
  data: {
    posts: PostType[]
  }
};

export type GetMyAssignmentsRequest = UserId;

export type GetMyAssignmentsResponse = ResponseType & {
  data: {
    assignments: AssignmentType[]
  }
};

export type GetMyLearnersRequest = UserId;

export type GetMyLearnersResponse = ResponseType & {
  data: {
    learners: UserType[]
  }
};

export type GetAllAuthorsRequest = void;

export type GetAllAuthorsResponse = ResponseType & {
  data: {
    authors: UserType[]
  }
};

export type GetAllLearnersRequest = void;

export type GetAllLearnersResponse = ResponseType & {
  data: {
    learners: UserType[]
  }
};

export type GetAllAdminsRequest = void;

export type GetAllAdminsResponse = ResponseType & {
  data: {
    admins: UserType[]
  }
};

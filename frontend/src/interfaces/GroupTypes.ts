import { PostType } from './PostType';
import { ResponseType } from './ResponseType';
import { UserType } from './UserType';

export type GroupId = number;
export type GroupAccessRequestId = number;

export type GroupType = {
  id: GroupId,
  owner_id:number,
  name:string,
  description:string,
  type:string,
  status:string,
  created_at:Date,
  updated_at:Date,
};

export type JoinGroupType = {
  id: GroupAccessRequestId,
  status:string,
  title:string,
  description:string,
  group_id: number,
  owner_id:number,
  course_id:number,
  join_date: Date,
  leave_date: Date,
};

export type GroupAccessRequestType = {
  created_at: Date,
  group_id: number,
  id: number,
  join_date: Date,
  leave_date: Date,
  status: string
  updated_at: Date,
  user_id: number
};

export type CreateGroupRequest = Omit<GroupType, 'id' | 'created_at' | 'updated_at'>;

export type CreateGroupResponse = ResponseType & {
  data: {
    group: GroupType
  }
};
export type GetGroupResponse = CreateGroupResponse;
export type DeleteGroupResponse = ResponseType;
export type UpdateGroupRequest = GroupType;
export type UpdateGroupResponse = CreateGroupResponse;

export type GetGroupMembersResponse = ResponseType & {
  data:{
    members: UserType[]
  }
};

export type GetGroupbyIdResponse = ResponseType & {
  data:{
    groups: GroupType
  }
};
export type GetGroupPostsResponse = ResponseType & {
  data:{
    posts: PostType[]
  }
};

export type JoinGroupRequest = {
  group_id: GroupId,
  user_id: number,
};

export type LeaveGroupRequest = JoinGroupRequest;

export type GetMyGroupsResponse = ResponseType & {
  data: {
    groups: JoinGroupType[]
  }
};

export type GetAllGroupsResponse = ResponseType & {
  data: {
    groups: GroupType[]
  }
};

export type GetGroupAccessRequestsResponse = ResponseType & {
  data: {
    requests: GroupAccessRequestType[]
  }
};

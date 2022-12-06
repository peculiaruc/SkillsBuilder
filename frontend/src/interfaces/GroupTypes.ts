import { PostType } from './PostType';
import { UserType } from './UserType';

export type GroupId = number;
export type GroupAccessRequestId = number;

export type GroupType = {
  id: GroupId,
  name:string,
  owner_id:number,
  description:string,
  type:string,
  status:string,
  created_at:Date,
  updated_at:Date,
};

export type JoinGroupType = {
  id: GroupAccessRequestId,
  status:string,
  group_id: number,
  user_id:number,
  join_date: Date,
  leave_date: Date,
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
    groups: GroupType[]
  }
};

export type GetGroupAccessRequestsResponse = ResponseType & {
  data: {
    requests: JoinGroupType[]
  }
};

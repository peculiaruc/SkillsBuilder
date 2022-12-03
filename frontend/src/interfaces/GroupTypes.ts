export type GroupType = {
  id: number,
  name:string,
  owner_id:number,
  type:string,
  status:string,
  created_at:Date,
  updated_at:Date,
};

export type JoinGroupType = {
  id: number,
  status:string,
  group_id: number,
  user_id:number,
  join_date: Date,
  leave_date: Date,
};

export type GroupId = {
  group_id: number,
};
export type CreateGroupRequest = Omit<GroupType, 'id' | ' created_at' | 'updated_at'>;

export type CreateGroupResponse = {
  error: string,
  status: string,
  data:{
    group: GroupType
  }
};

export type JoinGroupRequest = {
  group_id: number,
  user_id: number,
};

export type LeaveGroupRequest = {
  group_id: number,
  user_id: number,
};

export type GetGroupMembersRequest = GroupId;

export type GetGroupPostsRequest = GroupId;

export type DeleteGroupRequest = GroupId;

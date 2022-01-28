import { Remind } from '../entity/remind';

export interface IUserRemind extends Remind {
  imgs?: string[];
  likeNum: number;
  comment: IRemindCommentRes;
}
export interface IRemind extends IUserRemind {
  userName: string;
  img: string;
  liked: boolean;
  marked: boolean;
  focused: boolean;
}
export interface IRemindComment extends Comment {
  userName: string;
  userImg: string;
}

export interface IRemindComments extends IRemindComment {
  edges: {
    count: number;
    edges: IRemindComment[];
  };
}

export interface IRemindCommentRes {
  edges: {
    edges: IRemindComments[];
    count: number;
  };
  count: number;
}

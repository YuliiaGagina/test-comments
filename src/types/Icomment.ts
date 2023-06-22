export interface IComment {
  id: number;
  body: string;
  postId: number;
  user: User;
}


export interface User {
  id: number;
  username: string;
}

export interface ResponseData {
  comments: Array<IComment>;
  limit: number;
  skip: number;
  total: number;
}

// user.model.ts
export interface User {
  id: number;
  username: string;
}

// post.model.ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// comment.model.ts
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
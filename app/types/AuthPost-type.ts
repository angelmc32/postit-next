export type AuthPostType = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    content: string;
    createdAt: string;
    id: string;
    title: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      content: string;
      userId: string;
    }[];
  }[];
};

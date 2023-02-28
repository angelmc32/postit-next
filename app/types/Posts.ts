export type PostType = {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

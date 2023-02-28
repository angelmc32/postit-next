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
    content: string;
    id: string;
    postId: string;
    user: {
      name: string;
      image: string;
    };
    userId: string;
  }[];
};

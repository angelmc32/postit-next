"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../../components/posts/PostCard";
import { PostType } from "@/app/types/Posts";

type URL = {
  params: {
    postId: string;
  };
};

const getPostDetails = async (postId: string) => {
  const response = await axios.get(`/api/posts/${postId}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data: post, isLoading } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => getPostDetails(url.params.postId),
  });
  if (isLoading) return "Cargando...";
  console.log(post);
  return (
    <section className="section-container w-full px-2 md:w-2/3 lg:w-1/2 xl:w-2/5">
      {post && (
        <PostCard
          key={post.id}
          isDisabled={isLoading}
          postComments={post.comments}
          postContent={post.content}
          postId={post.id}
          postTitle={post.title}
          userAvatar={post.user.image}
          userName={post.user.name}
        />
      )}
    </section>
  );
}

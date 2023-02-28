"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPostType } from "@/app/types/AuthPost-type";
import PostCard from "../posts/PostCard";

const getAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function UserPosts() {
  const { data, isLoading } = useQuery<AuthPostType>({
    queryFn: getAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h4>Cargando...</h4>;

  return (
    <>
      <div>
        {data?.posts?.map((post) => (
          <PostCard
            key={post.id}
            isDisabled={isLoading}
            isEditable={true}
            postComments={post.comments}
            postContent={post.content}
            postId={post.id}
            postTitle={post.title}
            userAvatar={data.image}
            userName={data.name}
          />
        ))}
      </div>
    </>
  );
}

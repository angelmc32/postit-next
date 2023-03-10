"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./components/posts/PostCard";
import PostForm from "./components/posts/PostForm";
import { PostType } from "./types/Posts";
import { ReactNode } from "react";

const allPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data;
};

export default function Home(): ReactNode {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) {
    return <h2 className="text-xl text-red-700">500 | Error en el servidor</h2>;
  }
  if (isLoading) {
    return "Cargando...";
  }

  return (
    <section className="section-container w-full px-2 md:w-2/3 lg:w-1/2 xl:w-2/5">
      <PostForm />
      {data?.map((post) => (
        <PostCard
          key={post.id}
          postComments={post.comments}
          postContent={post.content}
          postId={post.id}
          postTitle={post.title}
          userAvatar={post.user.image}
          userName={post.user.name}
        />
      ))}
    </section>
  );
}

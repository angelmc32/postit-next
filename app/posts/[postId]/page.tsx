"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../../components/posts/PostCard";
import { PostType } from "@/app/types/Posts";
import CommentForm from "@/app/components/posts/CommentForm";

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
        <>
          <PostCard
            isDisabled={isLoading}
            postComments={post.comments}
            postContent={post.content}
            postId={post.id}
            postTitle={post.title}
            userAvatar={post.user.image}
            userName={post.user.name}
          />
          <CommentForm postId={post.id} />
          {post.comments?.map((comment) => (
            <div key={comment.id} className="my-6 rounded-md bg-white p-8">
              <div className="flex items-center gap-2">
                <Image
                  alt="User avatar"
                  className="rounded-full"
                  height={24}
                  src={comment.user?.image}
                  width={24}
                />
                <h3 className="font-bold">{comment?.user?.name}</h3>
                <h2 className="text-sm">{comment.createdAt}</h2>
              </div>
              <p className="py-4">{comment.content}</p>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "../elements/Button";
import ActionConfirmModal from "../layout/ActionConfirmModal";
import { deletePostConfirmationData } from "../dashboard/confirmationModals/deletePost";

type PostCardProps = {
  isDisabled?: boolean;
  isEditable?: boolean;
  postComments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  postContent: string;
  postId: string;
  postTitle: string;
  userAvatar: string;
  userName: string;
};

export default function PostCard({
  isDisabled = false,
  isEditable = false,
  postComments,
  postContent,
  postId,
  postTitle,
  userAvatar,
  userName,
}: PostCardProps) {
  const [toggleModal, setToggleModal] = useState(false);
  const queryClient = useQueryClient();
  let deleteToastID: string;

  const { mutate } = useMutation<Response, AxiosError, string, Response>(
    async (postId: string) => await axios.delete(`/api/posts/${postId}`),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Ocurrió un error, no fue posible eliminar tu Post", {
          id: deleteToastID,
        });
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["auth-posts"]);
        toast.success("Post has been deleted.", { id: deleteToastID });
      },
    }
  );

  const handleDeleteConfirmation = (postId: string) => {
    deleteToastID = toast.loading("Eliminando tu Post...", {
      id: deleteToastID,
    });
    mutate(postId);
  };
  return (
    <>
      <div className="my-8 rounded-md bg-white p-8">
        <div className="flex items-center gap-2">
          <Image
            alt="User avatar"
            className="rounded-full"
            src={userAvatar}
            height={32}
            width={32}
          />
          <h3 className="font-bold text-gray-700">{userName}</h3>
        </div>
        <div className="my-8">
          <h4 className="mb-4 text-lg font-bold">{postTitle}</h4>
          <p className="break-all">{postContent}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href={`/posts/${postId}`}>
            <p className="text-md font-bold text-gray-700 hover:text-primary-250">
              {postComments?.length} Comentarios
            </p>
          </Link>
          {isEditable && (
            <Button
              classes="text-md bg-gray-200 text-red-700 border-secondary-500 border-2 hover:bg-red-100 disabled:opacity-25"
              isDisabled={isDisabled}
              onClickHandler={() => setToggleModal(true)}
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>
      {toggleModal && (
        <ActionConfirmModal
          confirmationAction={() => handleDeleteConfirmation(postId)}
          confirmationDescription={deletePostConfirmationData.description}
          confirmationTitle={deletePostConfirmationData.title}
          setToggleModal={setToggleModal}
        />
      )}
    </>
  );
}

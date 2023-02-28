"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Button from "../elements/Button";

type CommentFormProps = {
  postId: string;
};

type FormData = {
  content: string;
  postId: string;
};

type MutationError = {
  response?: any;
  data?: any;
  errorMsg?: any;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastCommentId: string;

  const { mutate } = useMutation<Response, AxiosError, FormData, Response>(
    async (data: FormData) =>
      await axios.post("/api/posts/createComment", data),
    {
      onError: (error: MutationError) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.errorMsg, { id: toastCommentId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Se ha creado tu Post exitosamente", {
          id: toastCommentId,
        });
        queryClient.invalidateQueries(["detail-post"]);
        setContent("");
        setIsDisabled(false);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsDisabled(true);
    toastCommentId = toast.loading("Enviando tu comentario", {
      id: toastCommentId,
    });
    const formData: FormData = { content, postId };
    mutate(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md bg-gray-200 px-4 pt-8 pb-4 md:px-6"
    >
      <h3 className="mb-4 text-lg">Escribe tu comentario</h3>
      <div className="mb-4 flex flex-col">
        <textarea
          className="rounded-md bg-white p-2 text-lg"
          id="content"
          name="content"
          onChange={(event) => setContent(event.target.value)}
          placeholder="Qué tienes en mente..."
          rows={3}
          value={content}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`text-sm font-bold ${
            content.length > 300 ? "text-secondary-500" : "text-gray-800"
          }`}
        >
          {content.length}/300
        </p>
        <Button
          classes="text-md bg-secondary-500 text-white hover:bg-secondary-250 disabled:opacity-25"
          isDisabled={isDisabled}
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}

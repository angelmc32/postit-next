"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "../elements/Button";

type FormData = {
  title: string;
  content: string;
};

export default function PostForm() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostId: string;

  const { mutate } = useMutation<Response, AxiosError, FormData, Response>(
    async (data: FormData) => await axios.post("/api/posts/createPost", data),
    {
      onError: (error) => {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.errorMsg, { id: toastPostId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Se ha creado tu Post exitosamente", { id: toastPostId });
        queryClient.invalidateQueries(["posts"]);
        setContent("");
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    toastPostId = toast.loading("Creando tu Post", { id: toastPostId });
    setIsDisabled(true);
    const formData: FormData = { title, content };
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md bg-gray-200 px-4 pt-8 pb-4 md:px-6"
    >
      <div className="mb-4 flex flex-col">
        <input
          className="rounded-md bg-white p-2 text-lg"
          id="title"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Tu idea..."
          type="text"
          value={title}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <textarea
          className="rounded-md bg-white p-2 text-lg"
          id="content"
          name="content"
          onChange={(event) => setContent(event.target.value)}
          placeholder="Qué tienes en mente..."
          rows={5}
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
          Crear
        </Button>
      </div>
    </form>
  );
}

"use client";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createCommentAction } from "~/server/action/comments-list";
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        `block w-full rounded-md px-3.5 py-2.5 text-center text-base font-semibold text-primary shadow-sm 
ring-1 ring-inset ring-primary-light 
hover:bg-primary-extralight hover:shadow-inner
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-small`,
        {
          "bg-primary-extralight shadow-inner": pending,
        },
      )}
    >
      {pending ? "发送中..." : "发送"}
    </button>
  );
}
const NewCommentForm: React.FC<{ slug: string }> = ({ slug }) => {
  const [formState, formAction] = useFormState(
    createCommentAction.bind(null, slug),
    {
      message: "",
      success: false,
      data: undefined,
    },
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  if (formState.success) {
    textAreaRef.current!.value = "";
  }
  return (
    <form className="flex flex-row flex-wrap gap-2" action={formAction}>
      <div className="w-full">
        <label
          htmlFor="content"
          className="block w-full text-base font-semibold text-primary"
        >
          发送一个评论吧！
        </label>
        <textarea
          ref={textAreaRef}
          id="content"
          name="content"
          rows={4}
          placeholder="请保持友善"
          required
          className="mt-2 block w-full rounded-md border-0 px-3.5 py-2
      shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-primary-light 
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-small"
        />
      </div>
      <Submit />
      <p className="p-2 font-medium text-primary">{formState.message}</p>
    </form>
  );
};

export default NewCommentForm;

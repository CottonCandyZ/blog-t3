"use server";
import prisma from "~/server/db";
import z from "zod";
import { revalidatePath } from "next/cache";
import { getLoggedInUserInfo } from "~/lib/comments/session-and-user";
import { ERROR_MESSAGE, SUCCEED_MESSAGE } from "~/lib/comments/message";

export async function getComments(slug: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postSlug: slug,
    },
    orderBy: {
      createAt: "desc",
    },
    select: {
      id: true,
      content: true,
      createAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return comments;
}

export async function createTodo(
  slug: string,
  prevState: { message: string },
  formData: FormData,
) {
  const schema = z.object({
    content: z.string(),
  });
  const data = schema.parse({
    content: formData.get("content"),
  });
  if (data.content == "") {
    return { message: ERROR_MESSAGE.COMMENT_EMPTY };
  }
  const userInfo = await getLoggedInUserInfo();
  if (!userInfo) {
    return { message: ERROR_MESSAGE.SESSION_EXPIRE };
  }
  try {
    await prisma.comment.create({
      data: {
        content: data.content,
        postSlug: slug,
        authorId: userInfo.user.id,
      },
    });
    revalidatePath("/posts/[slug]", "page");
  } catch (e) {
    return { message: ERROR_MESSAGE.CREATE_COMMENT_FAILED };
  }
  return { message: SUCCEED_MESSAGE.COMMENT_SUCCEED };
}

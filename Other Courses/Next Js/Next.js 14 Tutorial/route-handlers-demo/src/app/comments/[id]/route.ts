import { comments } from "@/app/comments/data";
import { redirect } from "next/navigation";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  if (parseInt(params.id) > comments.length) {
    redirect("/comments")
  }

  const comment = comments.find((comment) => {
    return comment.id === parseInt(params.id)
  })

  return Response.json(comment)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { text } = body

  const commentIndex = comments.findIndex((comment) => {
    return comment.id === parseInt(params.id)
  })
  comments[commentIndex].text = text

  return Response.json(comments[commentIndex])
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const commentIndex = comments.findIndex((comment) => {
    return comment.id === parseInt(params.id)
  })
  const deletedComment = comments[commentIndex]
  comments.splice(commentIndex, 1)
  return Response.json(deletedComment)
}

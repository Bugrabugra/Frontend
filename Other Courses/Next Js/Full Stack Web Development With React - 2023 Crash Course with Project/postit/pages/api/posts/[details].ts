import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // get auth users posts
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              user: true
            }
          }
        }
      })
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ message: "Error has occurred whilst making a post" })
    }
  }
}

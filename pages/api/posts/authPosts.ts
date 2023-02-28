import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error,
        errorMsg: "Ocurrió un error, intente de nuevo",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMsg: "Método no soportado para este endpoint" });
  }
}

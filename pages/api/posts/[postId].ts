import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { postId } = req.query;

  if (Array.isArray(postId)) {
    return res
      .status(400)
      .json({ message: "Solicitud no soportada por el servidor" });
  }

  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error,
        errorMsg: "Ocurrió un error al cargar el Post, intente de nuevo",
      });
    }
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ message: "Por favor inicia sesión" });
    }
    try {
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error,
        errorMsg: "Ocurrió un error al eliminar el Post, intente de nuevo",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMsg: "Método no soportado para este endpoint" });
  }
}

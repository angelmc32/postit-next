import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error,
        errorMsg:
          "Ocurrió un error al cargar todos los Posts, intente de nuevo",
      });
    }
  } else {
    return res
      .status(500)
      .json({ errorMsg: "Método no soportado para este endpoint" });
  }
}

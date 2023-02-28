import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/client";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ errorMsg: "Por favor inicia sesión" });
    }
    const { content } = req.body;
    if (!content) {
      return res
        .status(403)
        .json({ errorMsg: "El contenido de tu comentario es requerido" });
    }
    if (content.length > 300) {
      return res.status(403).json({
        errorMsg:
          "Excediste el límite de caracteres para tu comentario (máximo 300)",
      });
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      const result = await prisma.post.create({
        data: {
          content,
          userId: prismaUser.id,
        },
      });
      res
        .status(200)
        .json({ result, successMsg: "Se ha creado su Comentario" });
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

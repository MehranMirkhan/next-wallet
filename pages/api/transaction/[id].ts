import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  switch (req.method) {
    case "DELETE":
      await remove(id);
      res.status(200);
      break;
  }
}

async function remove(id) {
  await prisma.transaction.delete({ where: { id } });
}

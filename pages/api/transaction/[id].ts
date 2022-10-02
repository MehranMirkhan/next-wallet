import { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from "pages/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  switch (req.method) {
    case "DELETE":
      try {
        await remove(id);
        return res.status(200).json({ id });
      } catch (e) {
        return res.status(500).json({ message: JSON.stringify(e) });
      }
  }
}

function remove(id) {
  return Prisma.getPrisma().transaction.delete({ where: { id } });
}

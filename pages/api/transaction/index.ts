import { Transaction } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { Prisma } from "pages/api";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Please sign in" });
  switch (req.method) {
    case "GET":
      try {
        const result = await get();
        return res.status(200).json(result);
      } catch (e) {
        return res.status(500).json({ message: JSON.stringify(e) });
      }
    case "POST":
      try {
        const result = await insert(req.body);
        return res.status(201).json(result);
      } catch (e) {
        return res.status(500).json({ message: JSON.stringify(e) });
      }
  }
}

function get() {
  return Prisma.getPrisma().transaction.findMany();
}

function insert(trans: Partial<Transaction>) {
  return Prisma.getPrisma().transaction.create({ data: trans as any });
}

import { PrismaClient, Transaction } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json(await get());
      break;
    case "POST":
      res.status(201).json(await insert(req.body));
      break;
  }
}

async function get() {
  return await prisma.transaction.findMany();
}

async function insert(trans: Partial<Transaction>) {
  return await prisma.transaction.create({ data: trans as any });
}

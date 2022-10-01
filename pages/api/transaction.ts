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
      const { fromWalletId, toWalletId, amount } = req.body;
      res.status(201).json(await insert(fromWalletId, toWalletId, amount));
      break;
  }
}

async function get() {
  return await prisma.transaction.findMany();
}

async function insert(
  fromWalletId: number,
  toWalletId: number,
  amount: number
) {
  const trans = {
    fromWalletId,
    toWalletId,
    amount,
  };
  return await prisma.transaction.create({ data: trans });
}

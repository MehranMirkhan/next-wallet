import { PrismaClient } from "@prisma/client";

export class Prisma {
  public static Prisma: PrismaClient;

  static getPrisma(): PrismaClient {
    if (!this.Prisma) this.Prisma = new PrismaClient();
    return this.Prisma;
  }
}

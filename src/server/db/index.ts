import process from 'node:process'
import { PrismaClient } from '@prisma/client'

declare const globalThis: {
  prismaGlobal?: PrismaClient
} & typeof global

export function getPrisma() {
  if (!globalThis.prismaGlobal) globalThis.prismaGlobal = new PrismaClient()

  const prisma = globalThis.prismaGlobal
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
  return prisma
}

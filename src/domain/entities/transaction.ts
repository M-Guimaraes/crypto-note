import { Transaction as PrismaTransaction } from '@prisma/client';

export type Transaction = Omit<PrismaTransaction, 'userId' | 'id'>;

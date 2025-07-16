import { prisma } from './client';

import { ITransactionRepository } from '../../../domain/repositories/transaction-repository';
import { Transaction } from '../../../domain/entities/transaction';

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction, userId: string): Promise<Transaction> {
    const response = await prisma.transaction.create({
      data: {
        cryptoCurrency: transaction.cryptoCurrency,
        date: transaction.date,
        cryptoPriceCents: transaction.cryptoPriceCents,
        quantity: transaction.quantity,
        feeCents: transaction.feeCents,
        userId,
      },
    });

    return response;
  }

  async findById(id: string, userId: string): Promise<Transaction | undefined> {
    const transaction = await prisma.transaction.findUnique({
      where: { id, userId },
    });

    if (!transaction) return;

    return transaction;
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return transactions;
  }

  async update(
    id: string,
    transaction: Transaction,
    userId: string
  ): Promise<void> {
    await prisma.transaction.update({
      where: { id, userId },
      data: transaction,
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.transaction.delete({ where: { id, userId } });
  }
}

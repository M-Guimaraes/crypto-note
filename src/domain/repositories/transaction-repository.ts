import { Transaction } from '@/domain/entities/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction, userId: string): Promise<Transaction>;
  update(id: string, transaction: Transaction, userId: string): Promise<void>;
  findAll(userId: string): Promise<Transaction[]>;
  findById(id: string, userId: string): Promise<Transaction | undefined>;
  delete(id: string, userId: string): Promise<void>;
}

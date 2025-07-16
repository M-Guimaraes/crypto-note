import { inject, injectable } from 'inversify';
import { TYPES } from '../../../container/types';
import { ITransactionRepository } from '../../../domain/repositories/transaction-repository';
import { Transaction } from '../../../domain/entities/transaction';

interface CreateTransactionRequest {
  quantity: number;
  fee: number;
  crypto_price: number;
  crypto_currency: string;
  userId: string;
}

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject(TYPES.ITransactionRepository)
    private readonly repository: ITransactionRepository
  ) {}

  async execute(request: CreateTransactionRequest): Promise<Transaction> {
    const { quantity, fee, crypto_price, crypto_currency, userId } = request;
    const date = new Date();

    const transaction = {
      date,
      quantity,
      feeCents: fee,
      cryptoPriceCents: crypto_price,
      cryptoCurrency: crypto_currency,
    };

    return this.repository.create(transaction, userId);
  }
}

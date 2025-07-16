import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../../container/types';

import { CreateTransactionUseCase } from '../../../application/use-cases/transactions/create-transaction';
import { ListTransactionUseCase } from '../../../application/use-cases/transactions/list-transaction';
import { GetTransactionUseCase } from '../../../application/use-cases/transactions/get-transaction';
import { DeleteTransactionUseCase } from '../../../application/use-cases/transactions/delete-transaction';

@injectable()
export class TransactionController {
  constructor(
    @inject(TYPES.CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    @inject(TYPES.ListTransactionUseCase)
    private readonly listTransactionsUseCase: ListTransactionUseCase,
    @inject(TYPES.GetTransactionUseCase)
    private readonly getTransactionUseCase: GetTransactionUseCase,
    @inject(TYPES.DeleteTransactionUseCase)
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase
  ) {}

  async create(request: Request, response: Response) {
    const { quantity, fee, crypto_price, crypto_currency } = request.body;
    const { userId } = request.params;

    const transaction = await this.createTransactionUseCase.execute({
      quantity,
      fee,
      crypto_price,
      crypto_currency,
      userId,
    });

    response.status(201).json(transaction);
  }

  async list(request: Request, response: Response) {
    const { userId } = request.params;
    const transactions = await this.listTransactionsUseCase.execute(userId);

    response.status(200).json(transactions);
  }

  async get(request: Request, response: Response) {
    const transactionId = request.params.id;
    const { userId } = request.params;

    const transaction = await this.getTransactionUseCase.execute({
      transactionId,
      userId,
    });

    if (!transaction) {
      return response.status(404).json({ message: 'Transaction not found' });
    }

    response.json(transaction);
  }

  async delete(request: Request, response: Response) {
    const { userId, id: transactionId } = request.params;

    await this.deleteTransactionUseCase.execute(transactionId, userId);

    response.status(204).send();
  }
}

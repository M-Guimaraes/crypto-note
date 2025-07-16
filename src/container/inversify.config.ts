import { Container } from 'inversify';
import { TYPES } from './types';

// Reepositories
import { ITransactionRepository } from '../domain/repositories/transaction-repository';
import { TransactionRepository } from '../infra/repository/prisma/prisma-transaction.repository';

// Transaction use-cases
import { CreateTransactionUseCase } from '../application/use-cases/transactions/create-transaction';
import { ListTransactionUseCase } from '../application/use-cases/transactions/list-transaction';
import { GetTransactionUseCase } from '../application/use-cases/transactions/get-transaction';
import { DeleteTransactionUseCase } from '../application/use-cases/transactions/delete-transaction';

// User use-cases
import { LoginUserUseCase } from '../application/use-cases/users/login-user';
import { RegisterUserUseCase } from '../application/use-cases/users/register-user';
import { LogoutUserUseCase } from '../application/use-cases/users/logout-user';
import { DeleteUserUseCase } from '../application/use-cases/users/delete-user';
import { RefreshTokenUseCase } from '../application/use-cases/users/refresh-token';

// Transaction controllers
import { TransactionController } from '../interfaces/http/controllers/transaction.controller';
import { AuthController } from '../interfaces/http/controllers/auth.controller';
import { IUserRepository } from '../domain/repositories/user-repository';
import { UserRepository } from '../infra/repository/prisma/prisma-user.repository';

const container = new Container();

// Repositories
container
  .bind<ITransactionRepository>(TYPES.ITransactionRepository)
  .to(TransactionRepository);

// User repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Transaction use-cases
container
  .bind<CreateTransactionUseCase>(TYPES.CreateTransactionUseCase)
  .to(CreateTransactionUseCase);

container
  .bind<ListTransactionUseCase>(TYPES.ListTransactionUseCase)
  .to(ListTransactionUseCase);

container
  .bind<GetTransactionUseCase>(TYPES.GetTransactionUseCase)
  .to(GetTransactionUseCase);

container
  .bind<DeleteTransactionUseCase>(TYPES.DeleteTransactionUseCase)
  .to(DeleteTransactionUseCase);

// User use-cases
container.bind<LoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUserUseCase);

container
  .bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase);

container
  .bind<LogoutUserUseCase>(TYPES.LogoutUserUseCase)
  .to(LogoutUserUseCase);

container
  .bind<DeleteUserUseCase>(TYPES.DeleteUserUseCase)
  .to(DeleteUserUseCase);

container
  .bind<RefreshTokenUseCase>(TYPES.RefreshTokenUseCase)
  .to(RefreshTokenUseCase);

// Transaction controllers
container
  .bind<TransactionController>(TYPES.TransactionController)
  .to(TransactionController);

// Auth controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };

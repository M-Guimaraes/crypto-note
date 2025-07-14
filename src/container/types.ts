const TYPES = {
  // Transaction Repositories
  ITransactionRepository: Symbol.for('ITransactionRepository'),

  // User Repositories
  IUserRepository: Symbol.for('IUserRepository'),

  // Transaction Use Cases
  CreateTransactionUseCase: Symbol.for('CreateTransactionUseCase'),
  ListTransactionUseCase: Symbol.for('ListTransactionUseCase'),
  GetTransactionUseCase: Symbol.for('GetTransactionUseCase'),
  UpdateTransactionUseCase: Symbol.for('UpdateTransactionUseCase'),
  DeleteTransactionUseCase: Symbol.for('DeleteTransactionUseCase'),

  // User Use Cases
  LoginUserUseCase: Symbol.for('LoginUserUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  LogoutUserUseCase: Symbol.for('LogoutUserUseCase'),
  DeleteUserUseCase: Symbol.for('DeleteUserUseCase'),
  RefreshTokenUseCase: Symbol.for('RefreshTokenUseCase'),

  // Transaction Controllers
  TransactionController: Symbol.for('TransactionController'),

  // User Controllers
  AuthController: Symbol.for('AuthController'),
};

export { TYPES };

import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';

import { TYPES } from '@/container/types';
import { IUserRepository } from '@/domain/repositories/user-repository';
import { User } from '@/domain/entities/user';
import { AppError } from '@/interfaces/http/middlewares/error-handler';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute(request: CreateUserRequest): Promise<User> {
    const user = {
      email: request.email,
      name: request.name,
      password: request.password,
    };

    const existingUser = await this.repository.findByEmail(user.email);

    if (existingUser) {
      throw new AppError('User already exists', 409);
    }

    user.password = await bcrypt.hash(user.password, 10);

    return await this.repository.create(user);
  }
}

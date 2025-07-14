import { User } from '@/domain/entities/user';

export interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
  saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void>;
  revokeToken(token: string): Promise<void>;
  findValidRefreshToken(token: string): Promise<{ userId: string } | null>;
}

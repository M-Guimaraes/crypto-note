import { IUserRepository } from '@/domain/repositories/user-repository';
import { prisma } from '../prisma/client';

import { injectable } from 'inversify';
import { User } from '@/domain/entities/user';

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    return prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return;
    return user;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        userId, // assume user.id is numeric
        token,
        expiresAt,
      },
    });
  }

  async revokeToken(token: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { token },
      data: { revokedAt: new Date() },
    });
  }

  async findValidRefreshToken(
    token: string
  ): Promise<{ userId: string } | null> {
    const found = await prisma.refreshToken.findUnique({ where: { token } });

    if (!found || found.revokedAt || found.expiresAt < new Date()) {
      return null;
    }

    return { userId: found.userId };
  }
}

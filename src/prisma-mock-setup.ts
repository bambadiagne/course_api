import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export type Context = {
  prisma: PrismaClient;
};

export const createMockContext = (): MockContext => {
  const mockContext: MockContext = {
    prisma: mockDeep<PrismaClient>(),
  };

  return mockContext;
};
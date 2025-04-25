import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../src/users/schemas/user.schema';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  const mockUser = {
    _id: '123',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$hashed',
    companies: [],
  };

  const mockLogger = {
    log: jest.fn(),
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  it('should create a user', async () => {
    model.findOne.mockReturnValue(null);
    model.create.mockReturnValue(mockUser);

    const result = await service.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });

    expect(result).toEqual(mockUser);
    expect(mockLogger.log).toHaveBeenCalledWith(
      'Creating user: test@example.com',
      'UsersService',
    );
  });

  it('should throw ConflictException if email exists', async () => {
    model.findOne.mockReturnValue(mockUser);

    await expect(
      service.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      }),
    ).rejects.toThrow(ConflictException);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      'User creation failed: Email test@example.com exists',
      'UsersService',
    );
  });
});

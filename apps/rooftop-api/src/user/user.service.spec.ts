import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  randEmail,
  randFirstName,
  randLastName,
  randPassword,
} from '@ngneat/falso';
import { compareSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { TypeOrmTestModule } from '../test/test-connection';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<UserEntity>;
  let module: TestingModule;
  let password: string;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmTestModule, TypeOrmModule.forFeature([UserEntity])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one', async () => {
    // Insert test data
    const createdUser = await createTestUser();

    // Find the user
    const foundUser = await service.findOne(createdUser.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(createdUser.id);
    expect(foundUser.email).toEqual(createdUser.email);

    // Ensure the password is not returned
    expect(foundUser.password).toBeUndefined();
  });

  it('should find one by email', async () => {
    // Insert test data
    const createdUser = await createTestUser();

    // Find the user
    const foundUser = await service.findOneByEmail(createdUser.email);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(createdUser.id);
    expect(foundUser.email).toEqual(createdUser.email);

    // Ensure the password is not returned
    expect(foundUser.password).toBeUndefined();
  });

  it('should create one', async () => {
    // Create a new user
    password = randPassword();
    const userData: CreateUserDto = {
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      password: password,
    };

    // Create the user
    const createdUser = await service.createOne(userData);
    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.email).toEqual(userData.email);
    expect(createdUser.firstName).toEqual(userData.firstName);
    expect(createdUser.lastName).toEqual(userData.lastName);

    // Ensure the password is not returned
    expect(createdUser.password).toBeUndefined();

    // Verify the password was hashed with 12 rounds
    const foundUser = await repo.findOneOrFail({
      where: {
        id: createdUser.id,
      },
      select: ['password'],
    });

    expect(foundUser.password).toBeDefined();
    expect(compareSync(password, foundUser.password)).toBeTruthy();
  });

  it('should find one with password', async () => {
    // Insert test data
    const createdUser = await createTestUser();

    // Find the user
    const foundUser = await service.findOneWithPassword(createdUser.email);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toEqual(createdUser.id);
    expect(foundUser.email).toEqual(createdUser.email);

    // Ensure the password is returned
    expect(foundUser.password).toBeDefined();
  });

  async function createTestUser() {
    password = randPassword();
    return await repo.save({
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      password: hashSync(password, 12),
    });
  }

  afterEach(async () => {
    await repo.delete({});
    await module.close();
  });
});

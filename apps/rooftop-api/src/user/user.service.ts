import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>
  ) {}

  async findOne(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }

  async createOne(data: CreateUserDto): Promise<UserEntity> {
    const user = this.repo.create(data);
    const created = await this.repo.save(user);
    return this.findOne(created.id);
  }

  async findOneWithPassword(email: string): Promise<UserEntity | null> {
    const qb = this.repo.createQueryBuilder('user');
    qb.where('user.email = :email', { email });
    qb.addSelect('user.password');
    return qb.getOne();
  }
}

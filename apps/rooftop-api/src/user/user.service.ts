import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { MailService } from '../mail/mail.service';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService
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

  async requestPasswordMail(email: string): Promise<void> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      return;
    }
    await this.mailService.sendResetPasswordEmail(user);
  }

  async deleteOne(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  @Transactional()
  async setNewPassword(code: string, password: string): Promise<void> {
    // Verify the code is correct
    const user = await this.passwordResetService.findOne(code);

    // Set the password on the user
    user.password = password;
    await this.repo.save(user);

    await this.passwordResetService.deleteOne(code);
  }

  async updateOne(
    id: string,
    data: Partial<CreateUserDto>
  ): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }
}

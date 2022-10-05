import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from '../configurations/boards/entities/board.entity';

@Injectable()
export class HeartbeatService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>
  ) {}

  async updateLastSeenAt(id: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('No board with the provided id was found');
    }
    board.last_seen_at = new Date();
    return this.boardRepository.save(board);
  }
}

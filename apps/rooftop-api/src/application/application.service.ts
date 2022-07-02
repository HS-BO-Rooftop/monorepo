import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { ShutdownService } from '../shutdown/shutdown.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationEntity } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  private logger = new Logger(ApplicationService.name);

  private _boostrapDone = new Subject<void>();

  boostrapDone = this._boostrapDone.asObservable();

  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repo: Repository<ApplicationEntity>,
    private readonly config: ConfigService,
    private readonly shutdownService: ShutdownService
  ) {
    this.createOwnApplication();
  }

  // Creates a new application for the farmer companion app if it doesn't already exist.
  private async createOwnApplication(): Promise<void> {
    // Check if CLIENT_ID is set in the environment.
    const clientId = this.config.get('CLIENT_ID');
    const frontendUrl = this.config.get('FRONTEND_URL');
    if (!frontendUrl) {
      this.logger.error('FRONTEND_URL is not set in the environment.');
      this.shutdownService.shutdown();
    }

    if (!clientId) {
      // Check if any applications exist.
      const applications = await this.repo.find();
      if (applications.length > 0) {
        // If applications exist, then don't create a new one.
        this.logger.error(`No CLIENT_ID set in the environment.`);
        this.logger.error(`Found ${applications.length} application(s).`);
        this.shutdownService.shutdown();
      } else {
        // Create a new application. And print the new client id and secret.
        const application = await this.repo.save({
          name: 'OnTop Farmer Companion',
          callbackUrl: `${frontendUrl}/auth/callback`,
          homepageUrl: frontendUrl,
          description: 'OnTop Farmer Companion',
          secret: this.generateSecret(),
        });
        this.logger.log(`Created new application with id: ${application.id}`);
        this.logger.log(`And secret: ${application.secret}`);
        this.logger.log(
          `Please set CLIENT_ID and CLIENT_SECRET in the environment.`
        );
        this.shutdownService.shutdown();
      }
    } else {
      this._boostrapDone.next();
    }
  }

  private async createApplication(
    data: CreateApplicationDto
  ): Promise<ApplicationEntity> {
    const application = this.repo.create(data);

    // Create a secret for the application.
    const secret = this.generateSecret();

    return this.repo.save(application);
  }

  // Generates a 255 character long secret.
  private generateSecret(): string {
    return [...Array(255)].map(() => Math.random().toString(36)[2]).join('');
  }

  // Finds an application by id.
  async findOne(id: string): Promise<ApplicationEntity> {
    return this.repo.findOne({
      where: { id },
    });
  }
}

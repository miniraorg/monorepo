import { Module } from '@nestjs/common';
import { JobTitleService } from './job-title.service';
import { JobTitleController } from './job-title.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    controllers: [JobTitleController],
    providers: [JobTitleService],
    imports: [PrismaModule],
})
export class JobTitleModule {}

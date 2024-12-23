import {Module} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {CompaniesController} from './companies.controller';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
    controllers: [CompaniesController],
    providers: [CompaniesService],
    imports: [PrismaModule],
    exports: [],
})
export class CompaniesModule {}

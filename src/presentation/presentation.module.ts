import { Module } from '@nestjs/common';
import { CsvController } from './controllers/csv.controller';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [CsvController],
})
export class PresentationModule {}

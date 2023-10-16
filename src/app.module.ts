import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

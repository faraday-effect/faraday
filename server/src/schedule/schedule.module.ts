import { TermService } from '@/schedule/services';
import { TermResolver } from '@/schedule/resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from '@/schedule/models';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Term])],
  providers: [TermService, TermResolver],
})
export class ScheduleModule {}

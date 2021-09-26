import { Module } from '@nestjs/common';
import { ResourceService } from './services';
import { ResourceResolver } from './resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourceService, ResourceResolver],
})
export class ContentModule {}

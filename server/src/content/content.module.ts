import { Module } from '@nestjs/common';
import { ModuleService, ResourceService } from './services';
import { ResourceResolver } from './resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource, Module as ModuleEntity } from './models';
import { ModuleResolver } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, ModuleEntity])],
  providers: [ModuleService, ModuleResolver, ResourceService, ResourceResolver],
})
export class ContentModule {}

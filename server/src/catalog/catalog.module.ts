import { Module } from '@nestjs/common';
import { CourseService } from '@/catalog/services';
import { CourseResolver } from '@/catalog/resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '@/catalog/models';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService, CourseResolver],
})
export class CatalogModule {}

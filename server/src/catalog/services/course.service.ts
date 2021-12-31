import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CourseCreateInput, CourseUpdateInput } from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class CourseService extends BaseService<Course> {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
  ) {
    super(repo);
  }

  // Create a new Course
  create(createInput: CourseCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
    'prefix',
    'department',
    'offerings',
    'offerings.term',
  ];

  // Read a single Course
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all Courses
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Update a Course.
  update(updateInput: CourseUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  // Delete a Course.
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { Course, CourseCreateInput, CourseUpdateInput } from '../models';
import { CourseService } from '@/catalog/services';

@Resolver('Course')
export class CourseResolver {
  constructor(private readonly Service: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('createInput') createInput: CourseCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => Course)
  readOneCourse(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [Course])
  readAllCourses() {
    return this.Service.readAll();
  }

  @Mutation(() => Course)
  updateCourse(@Args('updateInput') updateInput: CourseUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteCourse(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

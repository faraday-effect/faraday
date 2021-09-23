import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Academic department' })
export class Department {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Department name (e.g., `Computer Science`)')
  name: string;

  @Field(() => [Course])
  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];
}

@InputType()
export class DepartmentCreateInput {
  @FieldColumn('Department name (e.g., `Computer Science`)')
  name: string;
}

@InputType()
export class DepartmentUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Department name (e.g., `Computer Science`)', { nullable: true })
  name?: string;
}

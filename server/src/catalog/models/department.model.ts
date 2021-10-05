import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { FieldColumn } from '@/decorators';
import { Course } from '@/catalog/models';

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

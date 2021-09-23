import { Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prefix, Department, Offering } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Course' })
export class Course {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Course number (e.g., `243`, `103H`)')
  number: string;

  @FieldColumn('Course title')
  title: string;

  @Field(() => Prefix)
  @ManyToOne(() => Prefix, (prefix) => prefix.courses)
  prefix: Prefix;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.courses)
  department: Department;

  @Field(() => [Offering])
  @OneToMany(() => Offering, (offering) => offering.course)
  offerings: Offering[];
}

@InputType()
export class CourseCreateInput {
  @FieldColumn('Course number (e.g., `243`, `103H`)')
  number: string;

  @FieldColumn('Course title')
  title: string;
}

@InputType()
export class CourseUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Course number (e.g., `243`, `103H`)', { nullable: true })
  number?: string;

  @FieldColumn('Course title', { nullable: true })
  title?: string;
}

import { Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Term, Course, Module } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Course offering' })
export class Offering {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Number of credit hours', () => Int)
  creditHours: number;

  @Field(() => Term)
  @ManyToOne(() => Term, (term) => term.offerings)
  term: Term;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.offerings)
  course: Course;

  @Field(() => [Module])
  @OneToMany(() => Module, (module) => module.offering)
  modules: Module[];
}

@InputType()
export class OfferingCreateInput {
  @FieldColumn('Number of credit hours', () => Int)
  creditHours: number;
}

@InputType()
export class OfferingUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Number of credit hours', () => Int, { nullable: true })
  creditHours?: number;
}

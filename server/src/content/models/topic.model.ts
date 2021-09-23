import { Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Module, Resource, Activity } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Course topic (mid-level organizational unit)' })
export class Topic {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Title for this topic')
  title: string;

  @FieldColumn('Description of this topic')
  description: string;

  @FieldColumn('Collating sequence of topics within module', () => Int)
  sequence: number;

  @Field(() => Module)
  @ManyToOne(() => Module, (module) => module.topics)
  module: Module;

  @Field(() => [Resource])
  @OneToMany(() => Resource, (resource) => resource.topic)
  resources: Resource[];

  @Field(() => [Activity])
  @OneToMany(() => Activity, (activity) => activity.topic)
  activities: Activity[];
}

@InputType()
export class TopicCreateInput {
  @FieldColumn('Title for this topic')
  title: string;

  @FieldColumn('Description of this topic')
  description: string;

  @FieldColumn('Collating sequence of topics within module', () => Int)
  sequence: number;
}

@InputType()
export class TopicUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Title for this topic', { nullable: true })
  title?: string;

  @FieldColumn('Description of this topic', { nullable: true })
  description?: string;

  @FieldColumn('Collating sequence of topics within module', () => Int, {
    nullable: true,
  })
  sequence?: number;
}

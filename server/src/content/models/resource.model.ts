import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Module, Topic, Activity } from '.';
import { FieldColumn } from '@/decorators';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity()
@ObjectType({
  description: 'Resources for one of a module, topic, or activity',
})
export class Resource {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Name of this resource')
  name: string;

  @FieldColumn('Description of this resource')
  description: string;

  @Field(() => GraphQLJSONObject, { description: 'Details of this resource' })
  @Column({ type: 'jsonb', comment: 'Details of this resource' })
  details: Object;

  @Field(() => Module)
  @ManyToOne(() => Module, (module) => module.resources)
  module: Module;

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.resources)
  topic: Topic;

  @Field(() => Activity)
  @ManyToOne(() => Activity, (activity) => activity.resources)
  activity: Activity;
}

@InputType()
export class ResourceCreateInput {
  @FieldColumn('Name of this resource')
  name: string;

  @FieldColumn('Description of this resource')
  description: string;

  @Field(() => GraphQLJSONObject, { description: 'Details of this resource' })
  details: Object;
}

@InputType()
export class ResourceUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Name of this resource', { nullable: true })
  name?: string;

  @FieldColumn('Description of this resource', { nullable: true })
  description?: string;

  @Field(() => GraphQLJSONObject, {
    description: 'Details of this resource',
    nullable: true,
  })
  details?: Object;
}

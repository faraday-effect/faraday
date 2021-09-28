import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Module, Topic, Activity } from '.';
import { FieldColumn } from 'src/decorators';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity()
@ObjectType({
  description: 'Resources for one of a module, topic, or activity',
})
export class Resource {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Title of this resource')
  title: string;

  @FieldColumn('Description of this resource')
  description: string;

  @Field(() => GraphQLJSONObject, { description: 'Details of this resource' })
  @Column({ comment: 'Details of this resource', type: 'jsonb' })
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
  @FieldColumn('Title of this resource')
  title: string;

  @FieldColumn('Description of this resource')
  description: string;

  @Field(() => GraphQLJSONObject, { description: 'Details of this resource' })
  details: any;
}

@InputType()
export class ResourceUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Title of this resource', { nullable: true })
  title?: string;

  @FieldColumn('Description of this resource', { nullable: true })
  description?: string;

  @Field(() => GraphQLJSONObject, {
    description: 'Details of this resource',
    nullable: true,
  })
  details?: Object;
}

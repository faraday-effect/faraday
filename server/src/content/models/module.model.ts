import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Resource, Topic } from '.';
import { FieldColumn } from '@/decorators';
import { Offering } from '@/schedule/models';

@Entity()
@ObjectType({ description: 'Course module (top-level organizational unit)' })
export class Module {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Title for this module')
  title: string;

  @FieldColumn('Description of this module')
  description: string;

  @FieldColumn('Collating sequence of modules within offering', () => Int)
  sequence: number;

  @Field(() => Offering)
  @ManyToOne(() => Offering, (offering) => offering.modules)
  offering: Offering;

  @Field(() => [Resource])
  @OneToMany(() => Resource, (resource) => resource.module)
  resources: Resource[];

  @Field(() => [Topic])
  @OneToMany(() => Topic, (topic) => topic.module)
  topics: Topic[];
}

@InputType()
export class ModuleCreateInput {
  @FieldColumn('Title for this module')
  title: string;

  @FieldColumn('Description of this module')
  description: string;

  @FieldColumn('Collating sequence of modules within offering', () => Int)
  sequence: number;
}

@InputType()
export class ModuleUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Title for this module', { nullable: true })
  title?: string;

  @FieldColumn('Description of this module', { nullable: true })
  description?: string;

  @FieldColumn('Collating sequence of modules within offering', () => Int, {
    nullable: true,
  })
  sequence?: number;
}

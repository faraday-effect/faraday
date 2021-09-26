import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, InputType, Field, Int } from "@nestjs/graphql";
import { Topic, Resource } from ".";
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: "Course activity (low-level organizational unit)" })
export class Activity {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn("Title for this activity")
  title: string;

  @FieldColumn("Description of this activity")
  description: string;

  @FieldColumn("Collating sequence of activities within topic", () => Int)
  sequence: number;

  @Field({ description: "Details of this activity" })
  @Column({ comment: "Details of this activity", type: "jsonb" })
  details: string;

  @Field(() => Topic)
  @ManyToOne(() => Topic, topic => topic.activities)
  topic: Topic;

  @Field(() => [Resource])
  @OneToMany(() => Resource, resource => resource.activity)
  resources: Resource[];
}

@InputType()
export class ActivityCreateInput {
  @FieldColumn("Title for this activity")
  title: string;

  @FieldColumn("Description of this activity")
  description: string;

  @FieldColumn("Collating sequence of activities within topic", () => Int)
  sequence: number;

  @Field({ description: "Details of this activity" })
  details: string;
}

@InputType()
export class ActivityUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn("Title for this activity", { nullable: true })
  title?: string;

  @FieldColumn("Description of this activity", { nullable: true })
  description?: string;

  @FieldColumn("Collating sequence of activities within topic", () => Int, { nullable: true })
  sequence?: number;

  @Field({ description: "Details of this activity", nullable: true })
  details?: string;
}


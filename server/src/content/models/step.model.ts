import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { StepTitle, Activity } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Step for an activity' })
export class Step {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Ordering of this step within an activity', () => Int)
  sequence: number;

  @FieldColumn('Details of this step')
  details: string;

  @Field(() => StepTitle)
  @ManyToOne(() => StepTitle, (stepTitle) => stepTitle.steps)
  stepTitle: StepTitle;

  @Field(() => Activity)
  @ManyToOne(() => Activity, (activity) => activity.steps)
  activity: Activity;
}

@InputType()
export class StepCreateInput {
  @FieldColumn('Ordering of this step within an activity', () => Int)
  sequence: number;

  @FieldColumn('Details of this step')
  details: string;
}

@InputType()
export class StepUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Ordering of this step within an activity', () => Int, {
    nullable: true,
  })
  sequence?: number;

  @FieldColumn('Details of this step', { nullable: true })
  details?: string;
}

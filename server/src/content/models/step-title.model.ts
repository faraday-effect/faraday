import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Step } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Title for one step of an activity' })
export class StepTitle {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Title')
  title: string;

  @Field(() => [Step])
  @OneToMany(() => Step, (step) => step.stepTitle)
  steps: Step[];
}

@InputType()
export class StepTitleCreateInput {
  @FieldColumn('Title')
  title: string;
}

@InputType()
export class StepTitleUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Title', { nullable: true })
  title?: string;
}

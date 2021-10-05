import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Term } from '.';
import { FieldColumn } from '@/decorators';

@Entity()
@ObjectType({ description: 'Named range of dates' })
export class DateRange {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Name of this range')
  name: string;

  @Field({ description: 'Starting date of range (inclusive)' })
  @Column({ type: 'date', comment: 'Starting date of range (inclusive)' })
  startDate: Date;

  @Field({ description: 'Ending date of range (inclusive)' })
  @Column({ type: 'date', comment: 'Ending date of range (inclusive)' })
  endDate: Date;

  @Field(() => [Term])
  @OneToMany(() => Term, (term) => term.instructionDates)
  instructionDates: Term[];

  @Field(() => [Term])
  @OneToMany(() => Term, (term) => term.finalsDates)
  finalsDates: Term[];
}

@InputType()
export class DateRangeCreateInput {
  @FieldColumn('Name of this range')
  name: string;

  @Field({ description: 'Starting date of range (inclusive)' })
  startDate: Date;

  @Field({ description: 'Ending date of range (inclusive)' })
  endDate: Date;
}

@InputType()
export class DateRangeUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Name of this range', { nullable: true })
  name?: string;

  @Field({ description: 'Starting date of range (inclusive)', nullable: true })
  startDate?: Date;

  @Field({ description: 'Ending date of range (inclusive)', nullable: true })
  endDate?: Date;
}

import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';
import { Offering, DateRange } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Academic term' })
export class Term {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn("Term name (e.g., 'Fall 2021')")
  name: string;

  @Field(() => [Offering])
  @OneToMany(() => Offering, (offering) => offering.term)
  offerings: Offering[];

  @Field(() => DateRange)
  @ManyToOne(() => DateRange, (dateRange) => dateRange.instructionDates)
  instructionDates: DateRange;

  @Field(() => DateRange)
  @ManyToOne(() => DateRange, (dateRange) => dateRange.finalsDates)
  finalsDates: DateRange;
}

@InputType()
export class TermCreateInput {
  @FieldColumn("Term name (e.g., 'Fall 2021')")
  name: string;
}

@InputType()
export class TermUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn("Term name (e.g., 'Fall 2021')", { nullable: true })
  name?: string;
}

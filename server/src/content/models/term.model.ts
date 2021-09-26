import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ObjectType, InputType, Field, Int } from "@nestjs/graphql";
import { Offering } from ".";
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: "Academic term" })
export class Term {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn("Term name (e.g., 'Fall 2021')")
  name: string;

  @FieldColumn("Starting date of term")
  startDate: Date;

  @FieldColumn("Ending date of term")
  endDate: Date;

  @Field(() => [Offering])
  @OneToMany(() => Offering, offering => offering.term)
  offerings: Offering[];
}

@InputType()
export class TermCreateInput {
  @FieldColumn("Term name (e.g., 'Fall 2021')")
  name: string;

  @FieldColumn("Starting date of term")
  startDate: Date;

  @FieldColumn("Ending date of term")
  endDate: Date;
}

@InputType()
export class TermUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn("Term name (e.g., 'Fall 2021')", { nullable: true })
  name?: string;

  @FieldColumn("Starting date of term", { nullable: true })
  startDate?: Date;

  @FieldColumn("Ending date of term", { nullable: true })
  endDate?: Date;
}


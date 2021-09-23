import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '.';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'Course prefix (e.g., `COS`, `PHY`)' })
export class Prefix {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('Prefix (e.g., `COS`)')
  prefix: string;

  @FieldColumn('Longer description (e.g., `Computer Science`)')
  description: string;

  @Field(() => [Course])
  @OneToMany(() => Course, (course) => course.prefix)
  courses: Course[];
}

@InputType()
export class PrefixCreateInput {
  @FieldColumn('Prefix (e.g., `COS`)')
  prefix: string;

  @FieldColumn('Longer description (e.g., `Computer Science`)')
  description: string;
}

@InputType()
export class PrefixUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('Prefix (e.g., `COS`)', { nullable: true })
  prefix?: string;

  @FieldColumn('Longer description (e.g., `Computer Science`)', {
    nullable: true,
  })
  description?: string;
}

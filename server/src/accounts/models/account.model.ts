import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { FieldColumn } from 'src/decorators';

@Entity()
@ObjectType({ description: 'User account' })
export class Account {
  @Field(() => Int, { description: 'Primary key' })
  @PrimaryGeneratedColumn({ comment: 'Primary key' })
  id: number;

  @FieldColumn('User email (also used as account name)')
  email: string;

  @FieldColumn('Hashed password')
  password: string;

  @FieldColumn('User given name')
  firstName: string;

  @FieldColumn('User surname')
  lastName: string;

  @FieldColumn('Campus ID (e.g., student or faculty ID)')
  campusId: string;

  @FieldColumn('Office phone', { nullable: true })
  officePhone: string;

  @FieldColumn('Mobile phone', { nullable: true })
  mobilePhone: string;
}

@InputType()
export class AccountCreateInput {
  @FieldColumn('User email (also used as account name)')
  email: string;

  @FieldColumn('Hashed password')
  password: string;

  @FieldColumn('User given name')
  firstName: string;

  @FieldColumn('User surname')
  lastName: string;

  @FieldColumn('Campus ID (e.g., student or faculty ID)')
  campusId: string;

  @FieldColumn('Office phone', { nullable: true })
  officePhone: string;

  @FieldColumn('Mobile phone', { nullable: true })
  mobilePhone: string;
}

@InputType()
export class AccountUpdateInput {
  @Field(() => Int, { description: 'Primary key' })
  id: number;

  @FieldColumn('User email (also used as account name)', { nullable: true })
  email?: string;

  @FieldColumn('Hashed password', { nullable: true })
  password?: string;

  @FieldColumn('User given name', { nullable: true })
  firstName?: string;

  @FieldColumn('User surname', { nullable: true })
  lastName?: string;

  @FieldColumn('Campus ID (e.g., student or faculty ID)', { nullable: true })
  campusId?: string;

  @FieldColumn('Office phone', { nullable: true })
  officePhone?: string;

  @FieldColumn('Mobile phone', { nullable: true })
  mobilePhone?: string;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Status {
  @Field({ description: 'Simple status string' })
  status: string;
}

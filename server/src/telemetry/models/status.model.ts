import { Field, ObjectType } from '@nestjs/graphql';

/**
 * GraphQL object for reporting Faraday status.
 */
@ObjectType()
export class Status {
  @Field({ description: 'Simple status string' })
  status: string;
}

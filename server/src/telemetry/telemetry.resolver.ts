import { Query, Resolver } from '@nestjs/graphql';
import { Status } from './models/status.model';

@Resolver((of) => Status)
export class TelemetryResolver {
  @Query((returns) => Status, { description: 'Read current status' })
  readStatus() {
    return { status: 'okay' };
  }
}

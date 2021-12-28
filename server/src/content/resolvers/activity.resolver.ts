import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { ActivityService } from '../services';
import { Activity, ActivityCreateInput, ActivityUpdateInput } from '../models';

@Resolver('Activity')
export class ActivityResolver {
  constructor(private readonly Service: ActivityService) {}

  @Mutation(() => Activity)
  createActivity(@Args('createInput') createInput: ActivityCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => Activity)
  readOneActivity(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [Activity])
  readAllActivities() {
    return this.Service.readAll();
  }

  @Mutation(() => Activity)
  updateActivity(@Args('updateInput') updateInput: ActivityUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteActivity(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

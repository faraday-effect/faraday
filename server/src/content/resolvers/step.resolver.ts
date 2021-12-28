import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { StepService } from '../services';
import { Step, StepCreateInput, StepUpdateInput } from '../models';

@Resolver('Step')
export class StepResolver {
  constructor(private readonly Service: StepService) {}

  @Mutation(() => Step)
  createStep(@Args('createInput') createInput: StepCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => Step)
  readOneStep(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [Step])
  readAllSteps() {
    return this.Service.readAll();
  }

  @Mutation(() => Step)
  updateStep(@Args('updateInput') updateInput: StepUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteStep(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

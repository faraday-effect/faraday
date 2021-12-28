import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { StepTitleService } from '../services';
import {
  StepTitle,
  StepTitleCreateInput,
  StepTitleUpdateInput,
} from '../models';

@Resolver('StepTitle')
export class StepTitleResolver {
  constructor(private readonly Service: StepTitleService) {}

  @Mutation(() => StepTitle)
  createStepTitle(@Args('createInput') createInput: StepTitleCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => StepTitle)
  readOneStepTitle(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [StepTitle])
  readAllStepTitles() {
    return this.Service.readAll();
  }

  @Mutation(() => StepTitle)
  updateStepTitle(@Args('updateInput') updateInput: StepTitleUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteStepTitle(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

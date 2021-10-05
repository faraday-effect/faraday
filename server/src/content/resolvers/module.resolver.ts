import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { ModuleService } from '../services';
import { Module, ModuleCreateInput, ModuleUpdateInput } from '../models';

@Resolver('Module')
export class ModuleResolver {
  constructor(private readonly Service: ModuleService) {}

  @Mutation(() => Module)
  createModule(@Args('createInput') createInput: ModuleCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => Module)
  readOneModule(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [Module])
  readAllModules() {
    return this.Service.readAll();
  }

  @Mutation(() => Module)
  updateModule(@Args('updateInput') updateInput: ModuleUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteModule(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

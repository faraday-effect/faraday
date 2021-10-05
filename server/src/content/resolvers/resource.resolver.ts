import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { ResourceService } from '../services';
import { Resource, ResourceCreateInput, ResourceUpdateInput } from '../models';

@Resolver('Resource')
export class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Mutation(() => Resource)
  createResource(@Args('createInput') createInput: ResourceCreateInput) {
    return this.resourceService.create(createInput);
  }

  @Query(() => Resource)
  readOneResource(id: number) {
    return this.resourceService.readOne(id);
  }

  @Query(() => [Resource])
  readAllResources() {
    return this.resourceService.readAll();
  }

  @Mutation(() => Resource)
  updateResource(@Args('updateInput') updateInput: ResourceUpdateInput) {
    return this.resourceService.update(updateInput);
  }

  @Mutation(() => Int)
  deleteResource(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.resourceService.delete(id);
  }
}

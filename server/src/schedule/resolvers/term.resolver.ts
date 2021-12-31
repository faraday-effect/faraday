import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';

import { TermService } from '../services';
import { Term, TermCreateInput, TermUpdateInput } from '../models';

@Resolver('Term')
export class TermResolver {
  constructor(private readonly Service: TermService) {}

  @Mutation(() => Term)
  createTerm(@Args('createInput') createInput: TermCreateInput) {
    return this.Service.create(createInput);
  }

  @Query(() => Term)
  readOneTerm(id: number) {
    return this.Service.readOne(id);
  }

  @Query(() => [Term])
  readAllTerms() {
    return this.Service.readAll();
  }

  @Mutation(() => Term)
  updateTerm(@Args('updateInput') updateInput: TermUpdateInput) {
    return this.Service.update(updateInput);
  }

  @Mutation(() => Int)
  deleteTerm(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.Service.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Term, TermCreateInput, TermUpdateInput } from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class TermService extends BaseService<Term> {
  constructor(
    @InjectRepository(Term)
    private readonly repo: Repository<Term>,
  ) {
    super(repo);
  }

  /** Create a new Term */
  create(createInput: TermCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  /** Selectively include those relations that are always retrieved. */
  private alwaysRelate = ['offerings', 'instructionDates', 'finalsDates'];

  /** Read a single Term */
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  /** Read all Terms */
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Methods to retrieve related entities.

  retrieveRelatedOfferings(term: Term) {
    return this.retrieveOne(term, 'offerings');
  }

  /** Update a Term. */
  update(updateInput: TermUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  /** Delete a Term. */
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

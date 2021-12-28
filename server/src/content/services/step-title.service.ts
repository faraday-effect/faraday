import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  StepTitle,
  StepTitleCreateInput,
  StepTitleUpdateInput,
} from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class StepTitleService extends BaseService<StepTitle> {
  constructor(
    @InjectRepository(StepTitle)
    private readonly repo: Repository<StepTitle>,
  ) {
    super(repo);
  }

  // Create a new StepTitle
  create(createInput: StepTitleCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
    // "steps",
  ];

  // Read a single StepTitle
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all StepTitles
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Methods to retrieve related entities.

  retrieveRelatedSteps(stepTitles: StepTitle) {
    return this.retrieveOne(stepTitles, 'steps');
  }

  // Update a StepTitle.
  update(updateInput: StepTitleUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  // Delete a StepTitle.
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

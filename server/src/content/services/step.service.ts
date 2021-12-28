import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Step, StepCreateInput, StepUpdateInput } from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class StepService extends BaseService<Step> {
  constructor(
    @InjectRepository(Step)
    private readonly repo: Repository<Step>,
  ) {
    super(repo);
  }

  // Create a new Step
  create(createInput: StepCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
    // "stepTitle",
    // "activity",
  ];

  // Read a single Step
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all Steps
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Methods to retrieve related entities.

  retrieveRelatedStepTitle(step: Step) {
    return this.retrieveOne(step, 'stepTitle');
  }

  retrieveRelatedActivity(step: Step) {
    return this.retrieveOne(step, 'activity');
  }

  // Update a Step.
  update(updateInput: StepUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  // Delete a Step.
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

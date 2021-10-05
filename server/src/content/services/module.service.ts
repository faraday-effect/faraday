import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module, ModuleCreateInput, ModuleUpdateInput } from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class ModuleService extends BaseService<Module> {
  constructor(
    @InjectRepository(Module)
    private readonly repo: Repository<Module>,
  ) {
    super(repo);
  }

  // Create a new Module
  create(createInput: ModuleCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
    'offering',
    'resources',
    'topics',
    'topics.resources',
    'topics.activities',
    'topics.activities.resources',
  ];

  // Read a single Module
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all Modules
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Update a Module.
  update(updateInput: ModuleUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  // Delete a Module.
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource, ResourceCreateInput, ResourceUpdateInput } from '../models';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared/base.service';

@Injectable()
export class ResourceService extends BaseService<Resource> {
  constructor(
    @InjectRepository(Resource)
    private readonly repo: Repository<Resource>,
  ) {
    super(repo);
  }

  // Create a new Resource
  create(createInput: ResourceCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
    // "module",
    // "topic",
    // "activity",
  ];

  // Read a single Resource
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all Resources
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Methods to retrieve related entities.
  retrieveRelatedModule(resource: Resource) {
    return this.retrieveOne(resource, 'module');
  }

  retrieveRelatedTopic(resource: Resource) {
    return this.retrieveOne(resource, 'topic');
  }

  retrieveRelatedActivity(resource: Resource) {
    return this.retrieveOne(resource, 'activity');
  }

  // Update a Resource.
  update(updateInput: ResourceUpdateInput) {
    return this.repo
      .preload(updateInput)
      .then((result) => this.repo.save(result));
  }

  // Delete a Resource.
  delete(id: number) {
    return this.repo.delete(id).then((result) => result.affected);
  }
}

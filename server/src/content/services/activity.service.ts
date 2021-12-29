import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Activity,
  ActivityCreateInput,
  ActivityUpdateInput
} from "../models";
import { Repository } from "typeorm";
import { BaseService } from '@/shared/base.service';

@Injectable()
export class ActivityService extends BaseService<Activity> {
  constructor(
    @InjectRepository(Activity)
    private readonly repo: Repository<Activity>
  ) {
    super(repo);
  }

  // Create a new Activity
  create(createInput: ActivityCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  // Selectively include those relations that are always retrieved.
  private alwaysRelate = [
        // "topic",
        // "resources",
        // "steps",
  ];

  // Read a single Activity
  readOne(id: number) {
    return this.repo.findOne(id, { relations: this.alwaysRelate });
  }

  // Read all Activities
  readAll() {
    return this.repo.find({ relations: this.alwaysRelate });
  }

  // Methods to retrieve related entities.

  retrieveRelatedTopic(activity: Activity) {
    return this.retrieveOne(activity, "topic");
  }

  retrieveRelatedResources(activity: Activity) {
    return this.retrieveOne(activity, "resources");
  }

  retrieveRelatedSteps(activity: Activity) {
    return this.retrieveOne(activity, "steps");
  }

  // Update an Activity.
  update(updateInput: ActivityUpdateInput) {
    return this.repo
    .preload(updateInput)
    .then(result => this.repo.save(result));
  }

  // Delete an Activity.
  delete(id: number) {
    return this.repo.delete(id).then(result => result.affected);
  }
}


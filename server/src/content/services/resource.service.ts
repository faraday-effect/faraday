import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Resource, ResourceCreateInput, ResourceUpdateInput
} from "../models";
import { Repository } from "typeorm";

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly repo: Repository<Resource>
  ) {}

  create(createInput: ResourceCreateInput) {
    return this.repo.save(this.repo.create(createInput));
  }

  readOne(id: number) {
    return this.repo.findOne(id);
  }

  readAll() {
    return this.repo.find();
  }

  update(updateInput: ResourceUpdateInput) {
    return this.repo
    .preload(updateInput)
    .then(result => this.repo.save(result));
  }

  delete(id: number) {
    return this.repo.delete(id).then(result => result.affected);
  }
}


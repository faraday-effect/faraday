import { Repository } from 'typeorm';
import { getDebugger } from './debug-factory';

const debug = getDebugger('service');

export class BaseService<Entity> {
  constructor(private readonly entityRepo: Repository<Entity>) {}

  /**
   * Retrieve a related entity or entities.
   * N.B., if the entity/entities _already_ retrieved (e.g., from a previous database fetch),
   * return the already-retrieved entity/entities without hitting the database.
   * @param entity The "from" entity; we want to find an entity related to this one.
   * @param propertyPath The path to the "to" entity
   * @param multiple Retrieve multiple "to" entities?
   */
  _retrieve(entity: Entity, propertyPath: string, multiple: boolean) {
    function debugMessage(where: string) {
      debug(
        "retrieve '%s' (%s) in %s from %s",
        propertyPath,
        multiple ? 'Many' : 'One',
        entity.constructor.name,
        where,
      );
    }

    // The property path already has a value. Assume that this entity has already been retrieved,
    // often by a more expansive fetch of the parent entity from the database.
    if (entity[propertyPath]) {
      debugMessage('parent');
      return entity[propertyPath];
    }

    // Otherwise, the property path does _not_ have a value. Hit the database to retrieve
    // the "to" entity or entities (depending on the value of the `multiple` flag).
    debugMessage('database');
    const query = this.entityRepo
      .createQueryBuilder()
      .relation(propertyPath)
      .of(entity);
    return multiple ? query.loadMany() : query.loadOne();
  }

  /**
   * Retrieve a single related entity.
   * @param entity
   * @param propertyPath
   */
  retrieveOne(entity: Entity, propertyPath: string) {
    return this._retrieve(entity, propertyPath, false);
  }

  /**
   * Retrieve multiple related entities.
   * @param entity
   * @param propertyPath
   */
  retrieveMany(entity: Entity, propertyPath: string) {
    return this._retrieve(entity, propertyPath, true);
  }
}

// Credits:
// https://stackoverflow.com/a/60574675/1477144

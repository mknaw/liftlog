
import { BaseEntity, FindConditions } from 'typeorm';
import { Program } from '../db/entities/Entities';

export const validateUnique = async (
    entity: typeof BaseEntity, field: keyof typeof entity, message: string
) => {
  return async (value: string) => {
    // TODO Dunno how to get this to not complain
    const options: FindConditions<typeof entity> = { field: value };
    const program = await entity.findOne(options);
    return program === undefined ? true : message;
  }
}

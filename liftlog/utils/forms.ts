import { BaseEntity, FindConditions } from 'typeorm';

export const validateUnique = async (
  entity: typeof BaseEntity,
  field: keyof typeof entity,
  message: string,
) => (
  async (value: string): Promise<boolean | string> => {
    // TODO Dunno how to get this to not complain
    const options: FindConditions<typeof entity> = { field: value };
    const program = await entity.findOne(options);
    return program === undefined ? true : message;
  }
);

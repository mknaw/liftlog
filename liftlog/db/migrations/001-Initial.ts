import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import Lift from '../entities/Lift';

const liftNames = [
  'Bench Press',
  'Incline Bench Press',
  'Decline Bench Press',
  'Squat',
  'Front Squat',
  'Lunge',
  'Deadlift',
  'Romanian Deadlift',
  'Hamstring Curl',
  'Overhead Press',
  'Dumbbell Shoulder Press',
  'Lateral Raise',
];

export default class Initial1616335747077 implements MigrationInterface {
  // eslint-disable-next-line
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'program',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'workout_plan',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'nickname',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'programId',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['programId'],
          referencedTableName: 'program',
          referencedColumnNames: ['id'],
        },
      ],
    }), true);
    await queryRunner.createTable(new Table({
      name: 'workout',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'performed',
          type: 'integer',
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'lift',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    }), true);

    liftNames.forEach((name) => {
      queryRunner.manager.insert(Lift, { name });
    });

    await queryRunner.createTable(new Table({
      name: 'exercise_plan',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'weight',
          type: 'integer',
        },
        {
          name: 'reps',
          type: 'integer',
        },
        {
          name: 'sets',
          type: 'integer',
        },
        {
          name: 'workoutPlanId',
          type: 'integer',
        },
        {
          name: 'liftId',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['workoutPlanId'],
          referencedTableName: 'workout_plan',
          referencedColumnNames: ['id'],
        },
        {
          columnNames: ['liftId'],
          referencedTableName: 'lift',
          referencedColumnNames: ['id'],
        },
      ],
    }), true);
    await queryRunner.createTable(new Table({
      name: 'exercise',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'workoutId',
          type: 'integer',
        },
        {
          name: 'liftId',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['workoutId'],
          referencedTableName: 'workout',
          referencedColumnNames: ['id'],
        },
        {
          columnNames: ['liftId'],
          referencedTableName: 'lift',
          referencedColumnNames: ['id'],
        },
      ],
    }), true);

    await queryRunner.createTable(new Table({
      name: 'set',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'weight',
          type: 'integer',
        },
        {
          name: 'reps',
          type: 'integer',
        },
        {
          name: 'exerciseId',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['exerciseId'],
          referencedTableName: 'exercise',
          referencedColumnNames: ['id'],
        },
      ],
    }), true);
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lift');
    await queryRunner.dropTable('workout_plan');
    await queryRunner.dropTable('workout');
    await queryRunner.dropTable('exercise_plan');
    await queryRunner.dropTable('exercise');
    await queryRunner.dropTable('program');
    await queryRunner.dropTable('set');
  }
}

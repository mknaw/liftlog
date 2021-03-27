import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Lift } from '../entities/Entities';

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
]

export class CreateLiftsTable1616335747077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

      liftNames.map(name => {
        queryRunner.manager.insert(Lift, { name });
      })

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
            name: 'name',
            type: 'text',
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
            name: 'weight',
            type: 'integer',
          },
          {
            name: 'reps',
            type: 'integer',
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
            referencedColumnNames: ['id']
          },
          {
            columnNames: ['liftId'],
            referencedTableName: 'lift',
            referencedColumnNames: ['id']
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('lift');
      await queryRunner.dropTable('workout');
      await queryRunner.dropTable('exercise');
    }

}

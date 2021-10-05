import {
  Connection,
  createConnection,
  EntityManager,
  getManager,
} from 'typeorm';
import { Activity, Module, Resource, Topic } from '@/content/models';
import { DateRange, Offering, Term } from '@/schedule/models';
import { Course, Department, Prefix } from '@/catalog/models';

async function createTerm(manager: EntityManager) {
  const instructionRange = manager.create(DateRange, {
    name: 'Fall 2021 Instruction',
    startDate: '2020-08-30',
    endDate: '2020-12-10',
  });

  const finalsRange = manager.create(DateRange, {
    name: 'Fall 2021 Finals',
    startDate: '2020-12-13',
    endDate: '2020-12-16',
  });

  await manager.save([instructionRange, finalsRange]);

  return manager.save(Term, {
    name: 'Fall 2021',
    instructionDates: instructionRange,
    finalsDates: finalsRange,
  });
}

async function createCourseOffering(manager: EntityManager, term: Term) {
  const prefix = manager.create(Prefix, {
    prefix: 'COS',
    description: 'Computer Science & Engineering',
  });

  const department = manager.create(Department, {
    name: 'Computer Science & Engineering',
  });

  await manager.save([prefix, department]);

  const course = await manager.save(Course, {
    number: '243',
    title: 'Multi-tier Web Application Development',
    prefix,
    department,
  });

  return manager.save(Offering, {
    creditHours: 4,
    term,
    course,
  });
}

async function createContent(manager: EntityManager, offering: Offering) {
  const module = await manager.save(Module, {
    title: 'Revision Control with Git',
    description: 'How to keep track of All The Things',
    sequence: 1,
    offering,
  });

  const topic = await manager.save(Topic, {
    title: 'Introduction to Git',
    description: 'A brief history of revision control and introduction to Git',
    sequence: 1,
    module,
  });

  await manager.save(Activity, {
    title: 'Alice, Bob, and Git',
    description: 'Practice using Git with another class member',
    sequence: 1,
    details: {},
    topic,
  });

  await manager.save(Resource, {
    name: 'Intro to Git',
    description: 'Slides for the Intro to Git talk',
    details: {},
    topic,
  });
}

(async () => {
  let connection: Connection;
  try {
    connection = await createConnection();
    const manager = await getManager();
    const term = await createTerm(manager);
    const offering = await createCourseOffering(manager, term);
    await createContent(manager, offering);
  } catch (error) {
    console.error('ERROR', error);
  } finally {
    await connection.close();
  }
})();

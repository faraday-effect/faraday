import PrettyError = require('pretty-error');
PrettyError.start();

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
    startDate: '2021-08-30',
    endDate: '2021-12-10',
  });

  const finalsRange = manager.create(DateRange, {
    name: 'Fall 2021 Finals',
    startDate: '2021-12-13',
    endDate: '2021-12-16',
  });

  await manager.save([instructionRange, finalsRange]);

  await manager.save(Term, {
    name: 'Fall 2021',
    instructionDates: instructionRange,
    finalsDates: finalsRange,
  });

  const instruction2 = manager.create(DateRange, {
    name: 'Interterm 2022 Instruction',
    startDate: '2022-01-02',
    endDate: '2022-01-23',
  });

  return manager.save(Term, {
    name: 'Interterm 2022',
    instructionDates: instruction2,
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

  const topic = await manager.save(Topic, [
    {
      title: 'Introduction to Git',
      description:
        'A brief history of revision control and introduction to Git',
      sequence: 1,
      module,
    },
    {
      title: 'Grokking Git',
      description: 'Under the hood with Git',
      sequence: 2,
      module,
    },
  ]);

  await manager.save(Activity, {
    title: 'Alice, Bob, and Git',
    description: 'Practice using Git with another class member',
    sequence: 1,
    details: {},
    topic: topic[0],
  });

  await manager.save(Resource, {
    name: 'Intro to Git',
    description: 'Slides for the Intro to Git talk',
    details: {
      resourceType: 'file',
      fileType: 'pdf',
      fileName: 'git-intro.slides.pdf',
    },
    topic: topic[0],
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

import { getLoanRecordRepo } from '../config/appServices';
import { testLoanRecords } from './loan-records';

async function seed() {
  const repo = getLoanRecordRepo();

  for (const record of testLoanRecords) {
    console.log(`Seeding loan record with ID: ${record.id}`);
    await repo.create(record);
  }

  console.log('Seeding completed.');
}

seed().catch((error) => {
  console.error('Error during seeding:', error);
});

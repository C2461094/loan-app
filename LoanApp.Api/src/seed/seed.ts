import { getLoanRecordRepo } from '../config/appServices';
import { testLoanRecords } from './loan-records';
import { testDeviceModels } from './device-models';
import { getDeviceModelRepo } from '../config/appServices';

async function seed() {
  const deviceRepo = getDeviceModelRepo();
  const loanRepo = getLoanRecordRepo();
  
  //seed device models
  for (const device of testDeviceModels) {
    console.log(`Seeding device model with ID: ${device.id}`);
    await deviceRepo.create(device);
  }

  //seed loan records

  for (const record of testLoanRecords) {
    console.log(`Seeding loan record with ID: ${record.id}`);
    await loanRepo.create(record);
  }

  console.log('Seeding completed.');
}

seed().catch((error) => {
  console.error('Error during seeding:', error);
});

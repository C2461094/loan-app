import dotenv from 'dotenv';
import { CosmosLoanRecordRepo } from '../infra/cosmos-loan-record-repo';
import { Options } from '../infra/cosmos-loan-record-repo';
import { CosmosDeviceModelRepo } from '../infra/cosmos-device-model-repo';

dotenv.config();

// console.debug(process.env, '******* ENV VARIABLES ********');

let loanRecordRepo: CosmosLoanRecordRepo | null = null;

export function getLoanRecordRepo(): CosmosLoanRecordRepo {
  if (!loanRecordRepo) {
   // console.debug(process.env, '!!!! ******* ENV VARIABLES ********');
    const options = {
      key: process.env.COSMOS_DB_KEY,
      endpoint: process.env.COSMOS_DB_ENDPOINT,
      databaseId: process.env.COSMOS_DB_CONTAINER_NAME,
      containerId: process.env.COSMOS_DB_CONTAINER_NAME,
    } as Options;
   // console.debug(options, '!!!! ******* OPTIONS VARIABLES ********');

    loanRecordRepo = new CosmosLoanRecordRepo(options);
  }

  return loanRecordRepo;
}


let deviceModelRepo: CosmosDeviceModelRepo | null = null;

export function getDeviceModelRepo(): CosmosDeviceModelRepo {
  if (!deviceModelRepo) {
    const options = {
      key: process.env.COSMOS_DB_KEY,
      endpoint: process.env.COSMOS_DB_ENDPOINT,
      databaseId: process.env.COSMOS_DB_CONTAINER_NAME,
      containerId: process.env.COSMOS_DB_DEVICE_MODEL_CONTAINER_NAME,
    } as Options;

    deviceModelRepo = new CosmosDeviceModelRepo(options);
  }

  return deviceModelRepo;
}
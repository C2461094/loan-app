import dotenv from 'dotenv';
import { CosmosLoanRecordRepo } from '../infra/cosmos-loan-record-repo';

dotenv.config();

let loanRecordRepo: CosmosLoanRecordRepo | null = null;

export function getLoanRecordRepo(): CosmosLoanRecordRepo {
  if (!loanRecordRepo) {
    const options = {
      key: process.env.COSMOS_KEY!,
      endpoint: process.env.COSMOS_ENDPOINT!,
      databaseId: process.env.COSMOS_DB_ID!,
      containerId: process.env.COSMOS_CONTAINER_ID!,
    };

    loanRecordRepo = new CosmosLoanRecordRepo(options);
  }

  return loanRecordRepo;
}

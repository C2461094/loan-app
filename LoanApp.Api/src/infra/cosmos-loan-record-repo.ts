//import dependencies
import { CosmosClient, Container } from '@azure/cosmos';
import { LoanRecord } from '../domain/loan-record';
import { LoanTRecordRepo } from '../domain/loan-record-repo';
import { parseLoanStatus } from '../domain/loan-status';

//internal DTO shape for Cosmos DB persistence
type LoanRecordDTO = {
  id: string;
  userId: string;
  deviceId: string;
  status: string;
  reservedAt: string;
  collectedAt?: string;
  returnedAt?: string;
  dueDate: string;
};

//define the config options for Cosmos DB
export type Options = {
  key: string;
  endpoint: string;
  databaseId: string;
  containerId: string;
};

//class definitiona and constructor
export class CosmosLoanRecordRepo implements LoanTRecordRepo {
  private container: Container;

  constructor(options: Options) {
    console.debug(
      options,
      `*******" ENDPOINT: ${options.endpoint} -- KEY: ${options.key}`
    );

    const client = new CosmosClient({
      endpoint: options.endpoint,
      key: options.key,
    });
    const database = client.database(options.databaseId);
    this.container = database.container(options.containerId);
  }

  //create a new loan record
  async create(loan: LoanRecord): Promise<void> {
    const doc: LoanRecordDoc = {
      id: loan.id,
      userId: loan.userId,
      deviceId: loan.deviceId,
      status: loan.status,
      reservedAt: loan.reservedAt.toISOString(),
      collectedAt: loan.collectedAt?.toISOString(),
      returnedAt: loan.returnedAt?.toISOString(),
      dueDate: loan.dueDate.toISOString(),
    };
    await this.container.items.create(doc);
  }

  //get a loan record by id
  async getById(id: string): Promise<LoanRecord | null> {
    try {
      const { resource } = await this.container
        .item(id, id)
        .read<LoanRecordDTO>();
      if (!resource) return null;

      return LoanRecord.create({
        id: resource.id,
        userId: resource.userId,
        deviceId: resource.deviceId,
        status: parseLoanStatus(resource.status),
        reservedAt: new Date(resource.reservedAt),
        collectedAt: resource.collectedAt
          ? new Date(resource.collectedAt)
          : undefined,
        returnedAt: resource.returnedAt
          ? new Date(resource.returnedAt)
          : undefined,
        dueDate: new Date(resource.dueDate),
      });
    } catch {
      return null;
    }
  }

  //list loan records by user id
  async listByUserId(userId: string): Promise<LoanRecord[]> {
    // TODO: implement pagination for production use
    return [];
  }

  async listActiveByDeviceId(deviceId: string): Promise<LoanRecord[]> {
    return [];
  }

  async update(loan: LoanRecord): Promise<void> {
    // TODO: implement update logic
  }
}

type LoanRecordDoc = {
  id: string;
  userId: string;
  deviceId: string;
  status: string;
  reservedAt: string;
  collectedAt?: string;
  returnedAt?: string;
  dueDate: string;
};

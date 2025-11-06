import { LoanRecord } from "./domain/loan-record";

export interface LoanTRecordRepo {
  create(loan: LoanRecord): Promise<void>;
  getById(id: string): Promise<LoanRecord | null>;
  listByUserId(userId: string): Promise<LoanRecord[]>;
  listActiveByDeviceId(deviceId: string): Promise<LoanRecord[]>;
  update(loan: LoanRecord): Promise<void>;
}

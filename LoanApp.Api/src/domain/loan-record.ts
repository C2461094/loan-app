//Loan records
import { LoanStatus, parseLoanStatus } from "./loan-status";

export type LoanRecordProps = {
  id: string;
  userId: string;
  deviceId: string;
  status: LoanStatus;
  reservedAt: Date;
  collectedAt?: Date;
  returnedAt?: Date;
  dueDate: Date;
};

export class LoanRecord {
  readonly id: string;
  readonly userId: string;
  readonly deviceId: string;
  readonly status: LoanStatus;
  readonly reservedAt: Date;
  readonly collectedAt?: Date;
  readonly returnedAt?: Date;
  readonly dueDate: Date;

  private constructor(props: LoanRecordProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.deviceId = props.deviceId;
    this.status = props.status;
    this.reservedAt = props.reservedAt;
    this.collectedAt = props.collectedAt;
    this.returnedAt = props.returnedAt;
    this.dueDate = props.dueDate;
  }

  static create(props: LoanRecordProps): LoanRecord {
    if (!props.id) {
      throw new Error("LoanRecord must have an id");
    }
    if (!props.userId) {
      throw new Error("LoanRecord must have a userId");
    }
    if (!props.deviceId) {
      throw new Error("LoanRecord must have a deviceId");
    }
    if (!props.status) {
      throw new Error("LoanRecord must have a status");
    }
    if (!props.reservedAt) {
      throw new Error("LoanRecord must have a reservedAt date");
    }
    if (!props.dueDate) {
      throw new Error("LoanRecord must have a dueDate");
    }

    return new LoanRecord(props);
  }
}

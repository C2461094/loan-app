import { LoanRecord } from '../domain/loan-record';

export const testLoanRecords: LoanRecord[] = [
  LoanRecord.create({
    id: 'loan-1',
    userId: 'user-a1',
    deviceId: 'macbook-pro-2020',
    status: 'reserved',
    reservedAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // due in 2 days
  }),
  LoanRecord.create({
    id: 'loan-2',
    userId: 'user-a2',
    deviceId: 'dell-xps-13',
    status: 'collected',
    reservedAt: new Date(),
    collectedAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // due in 2 days
  }),
];

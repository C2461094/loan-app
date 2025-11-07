// loan-status.ts
export const LOAN_STATUSES = ["reserved", "collected", "returned"] as const;
export type LoanStatus = (typeof LOAN_STATUSES)[number];

export const isLoanStatus = (v: unknown): v is LoanStatus =>
  typeof v === "string" && (LOAN_STATUSES as readonly string[]).includes(v);

export const parseLoanStatus = (v: unknown): LoanStatus => {
  if (isLoanStatus(v)) return v;
  throw new Error("Invalid loan status");
};

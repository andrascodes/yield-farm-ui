// Change if we'd rather suport BigNumber
type AmountType = number;

interface OpportunityState {
  depositedAmount: AmountType;
  accruedInterestAmount: AmountType;
}
export interface Opportunity {
  key: string;
  name: string;
  apy: number;
}
export type OpportunityStatesType = Record<string, OpportunityState>;
export type OpportunitiesType = Record<string, Opportunity>;

export interface StateType {
  usdcBalance: AmountType;
  started: boolean;
  day: 0;
  opportunities: OpportunitiesType;
  opportunityStates: OpportunityStatesType;
}

interface ActionType<Type extends string, Payload extends Record<string, any>> {
  type: Type;
  payload: Payload;
}

export type EditInitialBalanceAction = ActionType<
  "editInitialBalance",
  { amount: AmountType }
>;
export type DepositAction = ActionType<
  "deposit",
  { opportunityId: string; amount: AmountType }
>;
export type WithdrawAction = ActionType<
  "withdraw",
  { opportunityId: string; amount: AmountType }
>;
export type ProgressAction = ActionType<"progress", { days: number }>;
export type AddOpportunitiesAction = ActionType<
  "addOpportunities",
  { opportunities: Opportunity[] }
>;
export type ResetAction = {
  type: "reset";
};

export type Action =
  | EditInitialBalanceAction
  | DepositAction
  | WithdrawAction
  | ProgressAction
  | AddOpportunitiesAction
  | ResetAction;

export enum STATE_ERRORS {
  OPPORTUNITY_NOT_FOUND = "Opportunity not found",
  NOT_DEPOSITED = "Can't withdraw from an opportunity where you haven't deposited",
  INSUFFICIENT_FUNDS = "Insufficient funds",
  NO_RESET_AFTER_START = "You need to reset before changing your USDC balance",
}

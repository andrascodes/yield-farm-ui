import { setError } from "./setErrorActionHandler";
import { DepositAction, StateType, STATE_ERRORS } from "./types";

export default function depositActionHandler(
  state: StateType,
  action: DepositAction
): StateType {
  const { amount, opportunityId } = action.payload;
  const { usdcBalance, opportunityStates, opportunities } = state;

  if (!opportunities[opportunityId]) {
    return setError(state, new Error(STATE_ERRORS.OPPORTUNITY_NOT_FOUND));
  }

  if (amount > usdcBalance) {
    return setError(state, new Error(STATE_ERRORS.INSUFFICIENT_FUNDS));
  }

  const currentOpportunityState = opportunityStates[opportunityId];
  let newDepositedAmount = amount;
  let newAccruedInterestAmount = 0;
  if (currentOpportunityState) {
    newDepositedAmount += currentOpportunityState.depositedAmount;
    newAccruedInterestAmount += currentOpportunityState.accruedInterestAmount;
  }

  return {
    ...state,
    usdcBalance: usdcBalance - amount,
    opportunityStates: {
      ...opportunityStates,
      [opportunityId]: {
        depositedAmount: newDepositedAmount,
        accruedInterestAmount: newAccruedInterestAmount,
      },
    },
  };
}

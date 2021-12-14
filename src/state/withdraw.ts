import { StateType, STATE_ERRORS, WithdrawAction } from "./types";

export default function withdrawActionHandler(
  state: StateType,
  action: WithdrawAction
): StateType {
  const { amount, opportunityId } = action.payload;
  const { usdcBalance, opportunityStates, opportunities } = state;

  if (opportunities[opportunityId]) {
    throw new Error(STATE_ERRORS.OPPORTUNITY_NOT_FOUND);
  }

  const currentOpportunityState = opportunityStates[opportunityId];
  if (!currentOpportunityState) {
    throw new Error(STATE_ERRORS.NOT_DEPOSITED);
  }

  const { depositedAmount, accruedInterestAmount } = currentOpportunityState;

  if (amount > depositedAmount + accruedInterestAmount) {
    throw new Error(STATE_ERRORS.INSUFFICIENT_FUNDS);
  }

  let newDepositedAmount = depositedAmount;
  let newAccruedInterestAmount = accruedInterestAmount;
  if (amount <= accruedInterestAmount) {
    newAccruedInterestAmount -= amount;
  } else {
    newDepositedAmount -= amount - newAccruedInterestAmount;
    newAccruedInterestAmount = 0;
  }

  return {
    ...state,
    usdcBalance: usdcBalance + amount,
    opportunityStates: {
      ...opportunityStates,
      [opportunityId]: {
        depositedAmount: newDepositedAmount,
        accruedInterestAmount: newAccruedInterestAmount,
      },
    },
  };
}

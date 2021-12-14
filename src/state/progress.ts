import { ProgressAction, StateType, OpportunityStatesType } from "./types";

export default function progressActionHandler(
  state: StateType,
  action: ProgressAction
): StateType {
  const { days } = action.payload;
  const { opportunityStates, opportunities } = state;

  const newOpportunityStatesArray = Object.keys(opportunityStates).map(
    (key) => {
      const { depositedAmount, accruedInterestAmount } = opportunityStates[key];
      const { apy } = opportunities[key];

      const newAccruedInterestAmount =
        accruedInterestAmount + depositedAmount * apy * (days / 365);

      return {
        key,
        depositedAmount,
        accruedInterestAmount: newAccruedInterestAmount,
      };
    }
  );

  return {
    ...state,
    opportunityStates: newOpportunityStatesArray.reduce<OpportunityStatesType>(
      (acc, curr) => {
        const { key, depositedAmount, accruedInterestAmount } = curr;
        acc[key] = {
          depositedAmount,
          accruedInterestAmount,
        };
        return acc;
      },
      {}
    ),
  };
}

import { useReducer } from "react";

import { INITIAL_BALANCE } from "../config";

import { Action, Opportunity, StateType } from "./types";
import addOpportunitiesHandler from "./addOpportunities";
import depositActionHandler from "./deposit";
import editInitialBalanceHandler from "./editInitialBalance";
import progressActionHandler from "./progress";
import withdrawActionHandler from "./withdraw";

const initialState: StateType = {
  usdcBalance: INITIAL_BALANCE,
  started: false,
  day: 0,
  opportunities: {},
  opportunityStates: {},
};

function appStateReducer(state: StateType, action: Action): StateType {
  switch (action.type) {
    case "addOpportunities":
      return addOpportunitiesHandler(state, action);
    case "editInitialBalance":
      return editInitialBalanceHandler(state, action);
    case "deposit":
      return depositActionHandler(state, action);
    case "withdraw":
      return withdrawActionHandler(state, action);
    case "progress":
      return progressActionHandler(state, action);
    default:
      return state;
  }
}

export default function useAppState() {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const editInitialBalance = (amount: number) => {
    dispatch({ type: "editInitialBalance", payload: { amount } });
  };
  const deposit = (opportunityId: string, amount: number) => {
    dispatch({ type: "deposit", payload: { opportunityId, amount } });
  };
  const withdraw = (opportunityId: string, amount: number) => {
    dispatch({ type: "withdraw", payload: { opportunityId, amount } });
  };
  const progress = (days: number) => {
    dispatch({ type: "progress", payload: { days } });
  };
  const reset = () => {
    dispatch({ type: "reset" });
  };
  const addOpportunities = (opportunities: Opportunity[]) => {
    dispatch({ type: "addOpportunities", payload: { opportunities } });
  };

  return {
    state,
    editInitialBalance,
    deposit,
    withdraw,
    progress,
    reset,
    addOpportunities,
  };
}

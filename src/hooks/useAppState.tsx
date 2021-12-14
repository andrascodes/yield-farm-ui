import React, { useCallback, useReducer } from "react";

import { INITIAL_BALANCE } from "../config";
import { Opportunity, StateType } from "../state/types";

import appStateReducer from "../state/appStateReducer";

export const initialState: StateType = {
  usdcBalance: INITIAL_BALANCE,
  started: false,
  day: 0,
  opportunities: {},
  opportunityStates: {},
};

interface AppStateContextValue {
  state: StateType;
  started: boolean;
  editInitialBalance: (amount: number) => void;
  deposit: (opportunityId: string, amount: number) => void;
  withdraw: (opportunityId: string, amount: number) => void;
  progress: (days: number) => void;
  reset: () => void;
  addOpportunities: (opportunities: Opportunity[]) => void;
}

const initialAppStateContextValue = {
  state: initialState,
  started: false,
  editInitialBalance: () => {},
  deposit: () => {},
  withdraw: () => {},
  progress: () => {},
  reset: () => {},
  addOpportunities: () => {},
};

const AppStateContext = React.createContext<AppStateContextValue>(
  initialAppStateContextValue
);

export default function AppStateProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  console.log(state);
  const editInitialBalance = useCallback(
    (amount: number) => {
      dispatch({ type: "editInitialBalance", payload: { amount } });
    },
    [dispatch]
  );

  const deposit = useCallback(
    (opportunityId: string, amount: number) => {
      dispatch({ type: "deposit", payload: { opportunityId, amount } });
    },
    [dispatch]
  );

  const withdraw = useCallback(
    (opportunityId: string, amount: number) => {
      dispatch({ type: "withdraw", payload: { opportunityId, amount } });
    },
    [dispatch]
  );

  const progress = useCallback(
    (days: number) => {
      dispatch({ type: "progress", payload: { days } });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  const addOpportunities = useCallback(
    (opportunities: Opportunity[]) => {
      dispatch({ type: "addOpportunities", payload: { opportunities } });
    },
    [dispatch]
  );

  const started = Object.keys(state.opportunityStates).length > 0;

  const value = {
    state,
    started,
    editInitialBalance,
    deposit,
    withdraw,
    progress,
    reset,
    addOpportunities,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return React.useContext(AppStateContext);
}

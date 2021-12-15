import React, { useCallback, useEffect, useReducer } from "react";

import { INITIAL_BALANCE } from "../config";
import { Opportunity, StateType } from "../state/types";

import appStateReducer from "../state/appStateReducer";
import { useSnackbar } from "../hooks/useSnackbar";

export const initialState: StateType = {
  usdcBalance: INITIAL_BALANCE,
  started: false,
  opportunities: {},
  opportunityStates: {},
  error: undefined,
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
  const { setSnackbarContent, setSnackbarOpen } = useSnackbar();

  const { error } = state;

  useEffect(() => {
    if (error) {
      setSnackbarContent({ severity: "error", message: error?.message });
      setSnackbarOpen(true);
    } else {
      setSnackbarContent(undefined);
      setSnackbarOpen(false);
    }
  }, [error, setSnackbarContent, setSnackbarOpen]);

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
      setSnackbarContent({
        severity: "info",
        message: `Progressed by ${days} days`,
      });
      setSnackbarOpen(true);
    },
    [dispatch, setSnackbarContent, setSnackbarOpen]
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
    setSnackbarContent({
      severity: "info",
      message: "Yield farming has reset",
    });
    setSnackbarOpen(true);
  }, [dispatch, setSnackbarContent, setSnackbarOpen]);

  const addOpportunities = useCallback(
    (opportunities: Opportunity[]) => {
      dispatch({ type: "addOpportunities", payload: { opportunities } });
    },
    [dispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      dispatch({ type: "setError", payload: { error } });
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
    setError,
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

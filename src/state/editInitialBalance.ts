import { setError } from "./setErrorActionHandler";
import { EditInitialBalanceAction, StateType, STATE_ERRORS } from "./types";

export default function editInitialBalanceHandler(
  state: StateType,
  action: EditInitialBalanceAction
): StateType {
  const { opportunityStates } = state;
  const started = Object.keys(opportunityStates).length > 0;

  if (started) {
    return setError(state, new Error(STATE_ERRORS.NO_RESET_AFTER_START));
  }
  const { amount } = action.payload;

  return { ...state, usdcBalance: amount };
}

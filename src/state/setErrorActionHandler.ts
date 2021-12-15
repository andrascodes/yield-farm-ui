import { SetErrorAction, StateType } from "./types";

export function setError(state: StateType, error: Error) {
  return {
    ...state,
    error,
  };
}

export default function setErrorActionHandler(
  state: StateType,
  action: SetErrorAction
): StateType {
  const { error } = action.payload;
  return setError(state, error);
}

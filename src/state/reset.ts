import { INITIAL_BALANCE } from "../config";
import { StateType } from "./types";

export default function resetHandler(state: StateType): StateType {
  return { ...state, usdcBalance: INITIAL_BALANCE, opportunityStates: {} };
}

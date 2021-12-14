import { INITIAL_BALANCE } from "../config";
import { StateType } from "./types";

export default function resetActionHandler(state: StateType): StateType {
  return { ...state, usdcBalance: INITIAL_BALANCE, opportunityStates: {} };
}

import { Action, StateType } from "./types";
import addOpportunitiesHandler from "./addOpportunities";
import depositActionHandler from "./deposit";
import editInitialBalanceHandler from "./editInitialBalance";
import progressActionHandler from "./progress";
import withdrawActionHandler from "./withdraw";
import resetActionHandler from "./reset";
import setErrorActionHandler from "./setErrorActionHandler";

export default function appStateReducer(
  state: StateType,
  action: Action
): StateType {
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
    case "reset":
      return resetActionHandler(state);
    case "setError":
      return setErrorActionHandler(state, action);
    default:
      return state;
  }
}

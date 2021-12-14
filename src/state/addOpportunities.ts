import { AddOpportunitiesAction, OpportunitiesType, StateType } from "./types";

export default function addOpportunitiesHandler(
  state: StateType,
  action: AddOpportunitiesAction
): StateType {
  const { opportunities } = action.payload;
  const opportunitiesMap = opportunities.reduce<OpportunitiesType>(
    (acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    },
    {}
  );

  return {
    ...state,
    opportunities: opportunitiesMap,
  };
}

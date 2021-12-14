import { useEffect } from "react";

import { useAppState } from "./useAppState";

import opportunities from "../config/opportunities.json";

export default function useFetchOpportunities() {
  const { addOpportunities } = useAppState();

  useEffect(() => {
    addOpportunities(opportunities.data);
  }, [addOpportunities]);
}

import { CircularProgress, Grid } from "@mui/material";
import { useAppState } from "../../hooks/useAppState";
import OpportunityCard from "./OpportunityCard";

export default function Opportunities() {
  const {
    state: { opportunities, opportunityStates },
  } = useAppState();

  if (!opportunities) {
    return <CircularProgress />;
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {Object.keys(opportunities).map((key) => (
            <OpportunityCard
              key={key}
              opportunity={opportunities[key]}
              opportunityState={opportunityStates[key]}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

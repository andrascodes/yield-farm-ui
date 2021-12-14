import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Opportunity, OpportunityState } from "../../state/types";

function CardRow({ name, value }: { name: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{name}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

export default function OpportunityCard({
  opportunity,
  opportunityState,
}: {
  opportunity: Opportunity;
  opportunityState?: OpportunityState;
}) {
  const { name, apy } = opportunity;

  const depositedAmount = opportunityState
    ? opportunityState.depositedAmount
    : 0;
  const accruedInterestAmount = opportunityState
    ? opportunityState.accruedInterestAmount
    : 0;

  return (
    <Grid item>
      <Card sx={{ minWidth: "300px" }}>
        <CardContent>
          <Typography variant="h6" align="center">
            {name}
          </Typography>
          <Stack direction="column" spacing={1}>
            <CardRow name="Current APY:" value={`${apy * 100}%`} />
            <CardRow
              name="Amount Deposited:"
              value={`${depositedAmount} USDC`}
            />
            <CardRow
              name="Accrued Interest:"
              value={`${accruedInterestAmount} USDC`}
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

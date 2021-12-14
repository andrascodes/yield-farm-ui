import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CardActions,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useAppState } from "../../hooks/useAppState";

export default function Balance() {
  const {
    state: { usdcBalance },
    started,
    editInitialBalance,
    reset,
  } = useAppState();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const amount = parseInt(event.target.value);
    if (!amount) {
      return editInitialBalance(0);
    }
    editInitialBalance(amount);
  };

  console.log(usdcBalance);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          USDC Balance
        </Typography>
        <TextField
          id="filled-basic"
          label="Amount"
          variant="filled"
          value={usdcBalance}
          disabled={started}
          type="number"
          inputProps={{
            min: 0,
          }}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
          }}
        />
      </CardContent>
      <CardActions
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button size="small" onClick={reset}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

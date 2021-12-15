import {
  Button,
  CardActions,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import { Opportunity } from "../../state/types";

type SwitchValue = "deposit" | "withdraw";

function DepositWithdrawButtonSwitch({
  onClick: handleClick,
  value,
}: {
  value: SwitchValue;
  onClick: (value: SwitchValue) => void;
}) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(_, value) => {
        if (value === "deposit") {
          handleClick("deposit");
        } else if (value === "withdraw") {
          handleClick("withdraw");
        }
      }}
    >
      <ToggleButton value="deposit">Deposit</ToggleButton>
      <ToggleButton value="withdraw">Withdraw</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function OpportunityCardActions({
  opportunityId,
  totalAmountDeposited,
}: {
  totalAmountDeposited: number;
  opportunityId: Opportunity["key"];
}) {
  const {
    deposit,
    withdraw,
    state: { usdcBalance },
  } = useAppState();

  const [amount, setAmount] = useState<number>(0);

  const [switchValue, setSwitchValue] = useState<SwitchValue>("deposit");

  const handleSubmit = useCallback(() => {
    switch (switchValue) {
      case "deposit":
        deposit(opportunityId, amount);
        break;
      case "withdraw":
        withdraw(opportunityId, amount);
        break;
      default:
        break;
    }
    setAmount(0);
  }, [switchValue, amount, opportunityId, deposit, withdraw]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const amount = parseInt(event.target.value);
    if (!amount) {
      return setAmount(0);
    }
    setAmount(amount);
  };

  const maxAmount =
    switchValue === "deposit" ? usdcBalance : totalAmountDeposited;

  return (
    <CardActions sx={{ display: "flex", justifyContent: "center" }}>
      <Stack direction="column" spacing={2}>
        <DepositWithdrawButtonSwitch
          value={switchValue}
          onClick={setSwitchValue}
        />
        <TextField
          label="Amount"
          variant="filled"
          value={amount}
          type="number"
          inputProps={{
            min: 0,
            max: maxAmount,
          }}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Stack>
    </CardActions>
  );
}

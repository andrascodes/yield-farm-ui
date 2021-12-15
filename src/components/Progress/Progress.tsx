import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CardActions,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAppState } from "../../hooks/useAppState";

export default function Progress() {
  const { progress, started } = useAppState();

  const [days, setDays] = useState<number>(0);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const amount = parseInt(event.target.value);
    if (!amount) {
      return setDays(0);
    }
    setDays(amount);
  };

  const handleSubmit = () => {
    progress(days);
    setDays(0);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Progress by
        </Typography>
        <TextField
          label="Days"
          variant="filled"
          value={days}
          disabled={!started}
          type="number"
          inputProps={{
            min: 0,
          }}
          onChange={handleChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">days</InputAdornment>,
          }}
        />
      </CardContent>
      <CardActions
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button size="small" onClick={handleSubmit}>
          Go
        </Button>
      </CardActions>
    </Card>
  );
}

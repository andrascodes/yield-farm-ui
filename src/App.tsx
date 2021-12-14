import { Container, Stack, Box } from "@mui/material";

import useFetchOpportunities from "./hooks/useFetchOpportunities";

import Balance from "./components/Balance";
import Opportunities from "./components/Opportunities";
import Progress from "./components/Progress";

function App() {
  useFetchOpportunities();

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Stack direction="column" spacing={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Balance />
          <Progress />
        </Box>
        <Opportunities />
      </Stack>
    </Container>
  );
}

export default App;

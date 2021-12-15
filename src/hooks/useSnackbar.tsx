import React, { useContext, useState } from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

export interface SnackbarContextType {
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbarContent: React.Dispatch<
    React.SetStateAction<SnackbarContent | undefined>
  >;
}

const initialValue: SnackbarContextType = {
  setSnackbarOpen: () => {},
  setSnackbarContent: () => {},
};

const SnackbarContext = React.createContext<SnackbarContextType>(initialValue);

export function useSnackbar() {
  return useContext(SnackbarContext);
}

interface SnackbarContent {
  severity: AlertProps["severity"];
  message: string;
}

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarContent, setSnackbarContent] = useState<
    SnackbarContent | undefined
  >();

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        {snackbarContent ? (
          <Alert severity={snackbarContent.severity}>
            {snackbarContent.message}
          </Alert>
        ) : undefined}
      </Snackbar>
      <SnackbarContext.Provider
        value={{
          setSnackbarOpen,
          setSnackbarContent,
        }}
      >
        {children}
      </SnackbarContext.Provider>
    </>
  );
}

"use client"
import { ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { AppStore, makeStore } from "@/libs/store"
import { useRef } from "react"
import { Provider } from "react-redux"

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
})

const queryClient = new QueryClient()

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={storeRef.current}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default AppProvider

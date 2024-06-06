"use client"
import { ThemeProvider, createTheme } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import React from "react"

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

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </div>
  )
}

export default Provider

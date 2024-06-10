import { Theme } from "@mui/material"

export const getStyles = (name: string, personName: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

import { Box, Chip } from "@mui/material"
import React from "react"

interface Props {
  selected: string[]
}

const SelectedChips = ({ selected }: Props) => {
  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    </div>
  )
}

export default SelectedChips

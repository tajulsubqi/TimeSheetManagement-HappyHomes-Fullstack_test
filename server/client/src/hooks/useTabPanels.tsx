import { useState } from "react"

const useTabPanels = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }
  return {
    value,
    setValue,
    handleChange,
    a11yProps,
  }
}

export default useTabPanels

"use client"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import * as React from "react"

import Header from "@/components/Header"
import Main from "@/components/Main"
import { TabPanels } from "@/components/TabPanels"
import { ThemeProvider } from "@mui/material"
import Setting from "@/components/setting/Setting"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export default function Home() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  return (
    <>
      <Header />

      <section className="bg-white px-7 pt-3 mt-2 shadow">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-slate-700 font-semibold">HH Timesheet</h2>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Daftar Kegiatan" {...a11yProps(0)} />
                <Tab label="Pengaturan" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </div>

          <button className="bg-red-500 hover:bg-red-600 duration-300 px-4 py-2 font-semibold text-white rounded-lg text-sm ">
            Export Laporan
          </button>
        </div>
      </section>

      <TabPanels value={value} index={0}>
        <Main />
      </TabPanels>

      <TabPanels value={value} index={1}>
        <Setting />
      </TabPanels>
    </>
  )
}

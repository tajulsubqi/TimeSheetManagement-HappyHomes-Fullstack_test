"use client"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"

import Header from "@/components/Header"
import Main from "@/components/Main"
import { TabPanels } from "@/components/TabPanels"
import Setting from "@/components/setting/Setting"
import useTabPanels from "@/hooks/useTabPanels"
import { useEffect, useState } from "react"
import axios from "axios"
import Papa from "papaparse"
import { CSVLink } from "react-csv"
import { IPropsTabelCsv } from "@/interface/IDataCsv"
import Swal from "sweetalert2"

export default function Home() {
  const { value, handleChange, a11yProps } = useTabPanels()
  const [dataCsv, setDataCsv] = useState<IPropsTabelCsv[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/export", {
          responseType: "blob",
          headers: {
            "Content-Type": "text/csv",
          },
        })

        const reader = new FileReader()
        reader.onload = () => {
          console.log("Reader Result:", reader.result)
          Papa.parse(reader.result as string, {
            header: true,
            complete: (results) => {
              console.log("Parsed Data:", results.data)
              setDataCsv(results.data as IPropsTabelCsv[])
            },
            error: (error: Error) => {},
          })
        }
        reader.readAsText(response.data)
      } catch (err) {}
    }

    fetchData()
  }, [])

  const handleDownload = () => {
    Swal.fire({
      icon: "success",
      title: "File CSV berhasil diunduh",
      showConfirmButton: false,
      timer: 1500,
    })
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

          <CSVLink
            data={dataCsv}
            headers={[
              { label: "ID", key: "id" },
              { label: "Activity Title", key: "activityTitle" },
              { label: "Start Date", key: "startDate" },
              { label: "End Date", key: "endDate" },
              { label: "Start Time", key: "startTime" },
              { label: "End Time", key: "endTime" },
              { label: "Duration", key: "duration" },
              { label: "Total Income", key: "totalIncome" },
              { label: "User", key: "user" },
              { label: "Project", key: "project" },
            ]}
            filename="activities.csv"
            onClick={handleDownload}
            className="bg-red-500 hover:bg-red-600 duration-300 px-4 py-3 font-semibold text-white rounded-lg text-sm "
          >
            Export Laporan
          </CSVLink>
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

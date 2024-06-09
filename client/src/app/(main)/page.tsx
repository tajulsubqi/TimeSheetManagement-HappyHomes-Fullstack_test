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
import Swal from "sweetalert2"
import { IPropsTabelCsv } from "@/interface/IDataCsv"
import { formatMsToDuration } from "@/utils/timeConversion"

export default function Home() {
  const { value, handleChange, a11yProps } = useTabPanels()
  const [dataCsv, setDataCsv] = useState<IPropsTabelCsv[]>([])
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tht-server-production.up.railway.app/api/v1/export/csv",
          {
            responseType: "blob",
            headers: {
              "Content-Type": "text/csv",
            },
          },
        )

        const reader = new FileReader()
        reader.onload = () => {
          Papa.parse(reader.result as string, {
            header: true,
            complete: (results) => {
              setDataCsv(results.data as IPropsTabelCsv[])
              calculateTotalIncomeAndDuration(results.data as IPropsTabelCsv[])
            },
            error: (error: Error) => {
              console.log("Error parsing CSV:", error)
            },
          })
        }
        reader.readAsText(response.data)
      } catch (err) {
        console.log("Error fetching CSV:", err)
      }
    }

    fetchData()
  }, [])

  const handleDownload = () => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Export Laporan CSV Gagal!",
        text: "Anda harus daftar terlebih dahulu untuk melakukan ekspor CSV.",
      })
      return
    }

    if (dataCsv.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Export Laporan CSV Gagal!",
        text: "Tidak ada data yang tersedia untuk diekspor.",
      })
      return
    }

    Swal.fire({
      icon: "success",
      title: "Export Laporan CSV Berhasil!",
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const calculateTotalIncomeAndDuration = (data: IPropsTabelCsv[]) => {
    let totalIncome = 0
    let totalDuration = 0
    data.forEach((activity) => {
      totalIncome += parseFloat(activity.totalIncome)
      totalDuration += parseFloat(activity.duration)
    })
    setTotalIncome(totalIncome)
    setTotalDuration(totalDuration)
  }

  // Menambahkan baris untuk total durasi dan total pendapatan
  const dataWithTotals = [
    ...dataCsv,
    {
      id: "",
      activityTitle: "Total",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      duration: formatMsToDuration(totalDuration),
      project: "",
      totalDuration: totalDuration,
      totalIncome: totalIncome,
    },
  ]

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
            data={dataWithTotals}
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

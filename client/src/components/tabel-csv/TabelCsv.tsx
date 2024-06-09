"use client"
import { IPropsTabelCsv } from "@/interface/IDataCsv"
import { formatToRupiah } from "@/utils/currencyFormatter"
import { formatMsToDuration } from "@/utils/timeConversion"
import axios from "axios"
import Papa from "papaparse"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"

const TabelCsv = () => {
  const [data, setData] = useState<IPropsTabelCsv[]>([])
  const [loading, setLoading] = useState(true)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

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
          Papa.parse(reader.result as string, {
            header: true,
            complete: (results) => {
              setData(results.data as IPropsTabelCsv[])
              setLoading(false)
              calculateTotalIncomeAndDuration(results.data as IPropsTabelCsv[])
            },
            error: (error: Error) => {
              console.log("Error:", error)
              setLoading(false)
              setError("Error parsing CSV data")
            },
          })
        }
        reader.readAsText(response.data)
      } catch (err) {
        console.log("Error:", err)
        setLoading(false)
        setError("Error fetching CSV data")
      }
    }

    fetchData()
  }, [])

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  // Menambahkan baris untuk total durasi dan total pendapatan
  const dataWithTotals = [
    ...data,
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
    <section className="bg-white px-6 rounded-xl shadow h-full pb-20">
      <div>
        <div className="flex gap-x-16 border-b py-6">
          <div>
            <p className="text-xs">Nama Karyawan</p>
            <p>agus</p>
          </div>
          <div>
            <p className="text-xs">Rate</p>
            <p>10000/jam</p>
          </div>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="w-1/3 text-start px-2 py-2 sm:px-4 sm:py-2 border">
                Judul Kegiatan
              </th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Nama Proyek</th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Tanggal Mulai</th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Tanggal Akhir</th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Waktu Mulai</th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Waktu Akhir</th>
              <th className="px-2 py-2 sm:px-4 sm:py-2 border">Durasi</th>
            </tr>
          </thead>
          <tbody>
            {dataWithTotals.length > 0 ? (
              dataWithTotals.map((item) => (
                <tr key={item.id} className="border font-light">
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.activityTitle}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.project}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.startDate}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.endDate}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.startTime}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.endTime}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {item.duration}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between bg-gray-100 text-Blue text-sm py-4 px-4">
          <div className="flex flex-col gap-y-2">
            <p className="font-light">Total Durasi</p>
            <p className="font-semibold text-[16px]">Total Pendapatan</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="font-light">{formatMsToDuration(totalDuration)}</p>
            <p className="font-semibold text-[17px]">{formatToRupiah(totalIncome)}</p>
          </div>
        </div>

        <CSVLink
          data={dataWithTotals}
          headers={[
            { label: "Id", key: "id" },
            { label: "Activity Title", key: "activityTitle" },
            { label: "Start Date", key: "startDate" },
            { label: "End Date", key: "endDate" },
            { label: "Start Time", key: "startTime" },
            { label: "End Time", key: "endTime" },
            { label: "Duration", key: "duration" },
            { label: "Total Duration", key: "totalDuration" },
            { label: "Total Income", key: "totalIncome" },
            { label: "User", key: "user" },
            { label: "Project", key: "project" },
          ]}
          filename="activities.csv"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Export to CSV
        </CSVLink>
      </div>
    </section>
  )
}

export default TabelCsv

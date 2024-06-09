"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import Papa from "papaparse"

interface IPropsTabelCsv {
  activityTitle: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  duration: string
  project: string
}

const TabelCsv = () => {
  const [data, setData] = useState<IPropsTabelCsv[]>([])
  const [loading, setLoading] = useState(true)

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
              setData(results.data as IPropsTabelCsv[])
              setLoading(false)
            },
            error: (error: Error) => {
              console.log("Error:", error)
              setLoading(false)
            },
          })
        }
        reader.readAsText(response.data)
      } catch (err) {
        console.log("Error:", err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>

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
            {data.length > 0 ? (
              data.map((activity, index) => (
                <tr key={index} className="border font-light">
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.activityTitle}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.project}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.startDate}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.endDate}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.startTime}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.endTime}
                  </td>
                  <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                    {activity.duration}
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
            <p className="font-light">total durasi</p>
            <p className="font-semibold text-[17px]">total pendapatan</p>
          </div>
        </div>

        <CSVLink
          data={data}
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Export to CSV
        </CSVLink>
      </div>
    </section>
  )
}

export default TabelCsv

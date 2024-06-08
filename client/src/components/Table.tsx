import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"
import DeleteActivityModal from "./modal-activity/DeleteActivityModal"
import EditActivityModal from "./modal-activity/EdtiActivityModal"
import { useQuery } from "@tanstack/react-query"
import { Api } from "@/libs/axiosInstance"
import {
  calculateDuration,
  formatDate,
  formatMsToDaysHoursMinutes,
} from "@/utils/timeConversion"
import { formatToRupiah } from "@/utils/currencyFormatter"
import { IActivity } from "@/interface/IActivity"

const Table = () => {
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editActivity, setEditActivity] = useState<IActivity | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: () => {
      const token = localStorage.getItem("token")
      return Api.get("/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })

  console.log(data)

  // Menghitung total pendapatan keseluruhan
  const activities = data?.data
  const totalIncome = activities?.data.reduce(
    (total: number, item: IActivity) => total + item.totalIncome,
    0,
  )

  // Menghitung total durasi keseluruhan
  const totalDuration = activities?.data.reduce(
    (total: number, item: IActivity) => total + item.duration,
    0,
  )

  const handleDeleteActivity = (id: string) => {
    setDeleteId(id)
    setOpenDelete(true)
  }

  const handleEditActivity = (activities: IActivity) => {
    setEditActivity(activities)
    setOpenEdit(true)
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="w-1/3 text-start px-2 py-2 sm:px-4 sm:py-2 border">
              Judul Kegiatan
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Nama Proyek</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Tanggal Mulai</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Tanggal Berakhir</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Waktu Mulai</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Waktu Berakhir</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Durasi</th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {activities?.data.map((item: IActivity) => (
            <tr key={item.id} className="border font-light">
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {item.activityTitle}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {item.project?.projectName}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {formatDate(item.startDate)}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {formatDate(item.endDate)}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {item.startTime}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {item.endTime}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {calculateDuration(item.startTime, item.endTime)}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                <div className="flex gap-x-2 items-center">
                  <button
                    onClick={() => handleEditActivity(item)}
                    className="cursor-pointer text-Blue border border-slate-300 p-1 rounded hover:bg-sky-100"
                  >
                    <CiEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDeleteActivity(item.id)}
                    className="cursor-pointer text-Red border border-slate-300 p-1 rounded hover:bg-red-100"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between bg-gray-100 text-Blue text-sm py-4 px-4">
        <div className="flex flex-col gap-y-2">
          <p className="font-light">Total Durasi</p>
          <p className="font-semibold text-[16px]">Total Pendapatan</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="font-light">{formatMsToDaysHoursMinutes(totalDuration)}</p>
          <p className="font-semibold text-[17px]">{formatToRupiah(totalIncome)}</p>
        </div>
      </div>

      <EditActivityModal
        open={openEdit}
        setOpen={setOpenEdit}
        editActivity={editActivity}
      />

      <DeleteActivityModal
        open={openDelete}
        setOpen={setOpenDelete}
        deleteId={deleteId}
      />
    </div>
  )
}

export default Table

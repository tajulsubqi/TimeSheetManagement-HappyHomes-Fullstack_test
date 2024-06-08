"use client"
import { IActivity } from "@/interface/IActivity"
import { formatToRupiah } from "@/utils/currencyFormatter"
import {
  calculateDuration,
  formatDate,
  formatMsToDaysHoursMinutes,
} from "@/utils/timeConversion"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"
import DeleteActivityModal from "./modal-activity/DeleteActivityModal"
import EditActivityModal from "./modal-activity/EditActivityModal"
import { IPropsTable } from "@/interface/ITable"
import { FaFilter } from "react-icons/fa"
import { TiFilter } from "react-icons/ti"

const Table = (Props: IPropsTable) => {
  const {
    data,
    handleDelete,
    handleEdit,
    openDelete,
    openEdit,
    totalIncome,
    totalDuration,
    deleteId,
    editActivity,
    setOpenDelete,
    setOpenEdit,
  } = Props

  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="w-1/3 text-start px-2 py-2 sm:px-4 sm:py-2 border">
              Judul Kegiatan
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Nama Proyek
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Tanggal Mulai
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Tanggal Akhir
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Waktu Mulai
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Waktu Akhir
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">
              <div className="flex items-center gap-x-2 ml-4 md:text-xs lg:text-sm">
                Durasi
                <TiFilter />
              </div>
            </th>
            <th className="px-2 py-2 sm:px-4 sm:py-2 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item: IActivity) => (
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
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer text-Blue border border-slate-300 p-1 rounded hover:bg-sky-100"
                  >
                    <CiEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
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

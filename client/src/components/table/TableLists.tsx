"use client"
import { IActivity } from "@/interface/IActivity"
import { calculateDuration } from "@/utils/calculateDuration"
import { formatDate } from "@/utils/timeConversion"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"

interface IPropsTableLists {
  data: IActivity[]
  handleEdit: (activity: IActivity) => void
  handleDelete: (id: string) => void
}

const TableLists = ({ data, handleEdit, handleDelete }: IPropsTableLists) => {
  return (
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
  )
}

export default TableLists

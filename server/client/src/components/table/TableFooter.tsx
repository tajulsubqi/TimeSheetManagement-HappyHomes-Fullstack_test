import { formatToRupiah } from "@/utils/currencyFormatter"
import { formatMsToDuration } from "@/utils/timeConversion"
import React from "react"

interface IPropsTableFooter {
  totalDuration: number
  totalIncome: number
}

const TableFooter = ({ totalDuration, totalIncome }: IPropsTableFooter) => {
  return (
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
  )
}

export default TableFooter

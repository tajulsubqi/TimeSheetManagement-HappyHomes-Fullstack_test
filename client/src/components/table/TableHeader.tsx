import React from "react"
import { TiFilter } from "react-icons/ti"

const TableHeader = () => {
  return (
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
  )
}

export default TableHeader

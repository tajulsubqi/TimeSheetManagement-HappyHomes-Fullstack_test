import React from "react"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"

const Table = () => {
  const data = [
    {
      col1: "Row 1 Col 1",
      col2: "Row 1 Col 2",
      col3: "Row 1 Col 3",
      col4: "Row 1 Col 4",
      col5: "Row 1 Col 5",
      col6: "Row 1 Col 6",
      col7: "Row 1 Col 7",
      col8: "Row 1 Col 8",
    },
    {
      col1: "Row 2 Col 1",
      col2: "Row 2 Col 2",
      col3: "Row 2 Col 3",
      col4: "Row 2 Col 4",
      col5: "Row 2 Col 5",
      col6: "Row 2 Col 6",
      col7: "Row 2 Col 7",
      col8: "Row 2 Col 8",
    },
    // Tambahkan baris sesuai kebutuhan
  ]

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
          {data.map((row, index) => (
            <tr key={index} className="border font-light">
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col1}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col2}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col3}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col4}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col5}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col6}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                {row.col7}
              </td>
              <td className="px-2 py-2 text-sm text-slate-700 sm:px-4 sm:py-2 border">
                <div className="flex gap-x-2 items-center">
                  <button className="cursor-pointer text-Blue border border-slate-300 p-1 rounded hover:bg-sky-100">
                    <CiEdit size={20} />
                  </button>

                  <button className="cursor-pointer text-Red border border-slate-300 p-1 rounded hover:bg-red-100">
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
          <p className="font-light">8 Jam 50 Menit</p>
          <p className="font-semibold text-[17px]">Rp.153.000</p>
        </div>
      </div>
    </div>
  )
}

export default Table

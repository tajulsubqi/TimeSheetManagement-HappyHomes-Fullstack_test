import React from "react"
import Input from "../ui/Input"
import RateInput from "../ui/RateInput"

const Setting = () => {
  return (
    <div className="w-full h-full mt-24 flex justify-center items-center">
      <div className="bg-white rounded-xl flex flex-col gap-y-5 px-10 py-9 shadow">
        <Input label="Nama Karyawan" />
        <RateInput label="Rate" />

        <div className="flex gap-x-2">
          <button className="w-full px-4 py-2 rounded-lg text-Blue bg-slate-100 hover:bg-slate-200 duration-300 border border-slate-300">
            Batal
          </button>
          <button className="w-full bg-Blue hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-lg">
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting

import React from "react"

const RateInput = ({ label }: { label: string }) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-600" htmlFor="">
        {label}
      </label>
      <div className="relative w-full flex  items-center">
        <span className="absolute left-3 text-slate-400">Rp</span>
        <input
          type="number"
          className="w-full flex-grow outline-none border border-slate-300 px-10 py-2 rounded"
        />
        <span className="absolute right-3 text-slate-400">/jam</span>
      </div>
    </div>
  )
}

export default RateInput

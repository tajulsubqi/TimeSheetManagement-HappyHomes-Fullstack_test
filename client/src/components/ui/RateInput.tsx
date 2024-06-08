import React from "react"

interface Props {
  label: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const RateInput = ({ label, name, onChange, value }: Props) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-600" htmlFor="">
        {label}
      </label>
      <div className="relative w-full flex  items-center">
        <span className="absolute left-3 text-slate-400">Rp</span>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type="number"
          className="w-full flex-grow outline-none border border-slate-300 px-10 py-2 rounded"
        />
        <span className="absolute right-3 text-slate-400">/jam</span>
      </div>
    </div>
  )
}

export default RateInput

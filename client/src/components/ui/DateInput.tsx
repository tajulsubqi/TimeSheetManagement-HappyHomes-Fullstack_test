import React from "react"
interface Props {
  name?: string
  value?: string
  label?: string
  type?: "date" | "time"
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DateInput = ({ name, value, label, type = "date", onChange }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-1">
      <label className="text-xs font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="dd/mm/yyyy"
        className="w-full flex-grow outline-none border border-slate-300 px-3 py-2 rounded"
      />
    </div>
  )
}

export default DateInput

import React from "react"

interface Props {
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const Input = ({ label, onChange, value }: Props) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-600" htmlFor="">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        type="text"
        className="w-full flex-grow outline-none border border-slate-300 px-3 py-2 rounded"
      />
    </div>
  )
}

export default Input

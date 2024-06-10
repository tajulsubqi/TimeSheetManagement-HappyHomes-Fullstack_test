import React from "react"

interface Props {
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string
  disabled?: boolean
}

const Input = ({ label, onChange, value, name, disabled }: Props) => {
  return (
    <div>
      <label className="text-md font-semibold text-slate-600" htmlFor="">
        {label}
      </label>
      <input
        disabled={disabled}
        name={name}
        onChange={onChange}
        value={value}
        type="text"
        className="w-full flex-grow outline-none border border-slate-300 px-3 py-2 rounded"
      />
    </div>
  )
}

export default Input

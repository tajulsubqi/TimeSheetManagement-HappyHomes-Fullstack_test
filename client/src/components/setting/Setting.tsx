"use client"
import React, { useState } from "react"
import Input from "../ui/Input"
import RateInput from "../ui/RateInput"
import { useMutation } from "@tanstack/react-query"
import { Api } from "@/libs/axiosInstance"
import Swal from "sweetalert2"

interface IUser {
  name: string
  hourlyRate: string
}

const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    hourlyRate: "",
  })
  const [isDisabled, setIsDisabled] = useState(false)

  const mutation = useMutation({
    mutationFn: (newUser: IUser) => Api.post("/user", newUser),
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "Karyawan berhasil ditambahkan!",
        icon: "success",
      })
      setFormData({ name: "", hourlyRate: "" })
      setIsDisabled(true)
    },
    onError: (error: any) => {
      console.error("Error creating user", error)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.hourlyRate) {
      Swal.fire({
        title: "Error",
        text: "Nama dan rate harus diisi!",
        icon: "error",
      })
      return
    }

    mutation.mutate(formData)
  }

  return (
    <div className="w-full h-full mt-24 flex justify-center items-center">
      <div className="bg-white rounded-xl flex flex-col gap-y-5 px-10 py-9 shadow">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Nama Karyawan"
          disabled={isDisabled}
        />
        <RateInput
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          label="Rate"
          disabled={isDisabled}
        />

        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setFormData({ name: "", hourlyRate: "" })}
            className="w-full px-4 py-2 rounded-lg text-Blue bg-slate-100 hover:bg-slate-200 duration-300 border border-slate-300"
            disabled={isDisabled}
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="w-full bg-Blue hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-lg"
            disabled={isDisabled}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Setting

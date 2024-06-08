"use client"
import React, { useState } from "react"
import Input from "../ui/Input"
import RateInput from "../ui/RateInput"
import { useMutation } from "@tanstack/react-query"
import { Api } from "@/libs/axiosInstance"

interface IUser {
  name: string
  hourlyRate: string
}

const Setting = () => {
  const [formData, setFormData] = useState({
    name: "",
    hourlyRate: "",
  })

  const mutation = useMutation({
    mutationFn: (newUser: IUser) => Api.post("/user", newUser),
    onSuccess: (response) => {
      const token = response.data.token
      localStorage.setItem("token", token)

      console.log("User created successfully", response.data)
      alert("User created successfully!")
      setFormData({ name: "", hourlyRate: "" })
    },
    onError: (error: any) => {
      console.error("Error creating user", error)
      alert("Failed to create user. " + (error.response?.data?.message || ""))
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validasi sebelum pengiriman
    if (!formData.name || !formData.hourlyRate) {
      alert("Name and hourly rate are required")
      return
    }

    mutation.mutate(formData)
  }

  return (
    <div className="w-full h-full mt-24 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl flex flex-col gap-y-5 px-10 py-9 shadow"
      >
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Nama Karyawan"
        />
        <RateInput
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          label="Rate"
        />

        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setFormData({ name: "", hourlyRate: "" })}
            className="w-full px-4 py-2 rounded-lg text-Blue bg-slate-100 hover:bg-slate-200 duration-300 border border-slate-300"
          >
            Batal
          </button>

          <button
            type="submit"
            className="w-full bg-Blue hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}

export default Setting

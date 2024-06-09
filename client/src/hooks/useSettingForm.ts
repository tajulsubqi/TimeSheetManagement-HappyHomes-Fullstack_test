"use client"
import { Api } from "@/libs/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import React, { useState } from "react"
import Swal from "sweetalert2"

interface ISettingForm {
  name: string
  hourlyRate: string
}

const useSettingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    hourlyRate: "",
  })
  const [isDisabled, setIsDisabled] = useState(false)

  const mutation = useMutation({
    mutationFn: (newUser: ISettingForm) => Api.post("/user", newUser),
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

  return {
    formData,
    handleChange,
    handleSubmit,
    isDisabled,
    setFormData
  }
}

export default useSettingForm

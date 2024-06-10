import { Api } from "@/libs/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import React, { useState, useEffect } from "react"
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsDisabled(true)
      Swal.fire({
        title: "Oops..",
        text: "Karyawan sudah terdaftar, tidak dapat menambahkan lagi!",
        icon: "warning",
      })
    }
  }, [])

  const mutation = useMutation({
    mutationFn: async (newUser: ISettingForm) => {
      const response = await Api.post("/user", newUser)
      const { token } = response.data
      localStorage.setItem("token", token)
      return response
    },
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
    setFormData,
  }
}

export default useSettingForm

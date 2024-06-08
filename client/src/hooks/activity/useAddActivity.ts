import { IAddActivity } from "@/interface/IActivityModal"
import { Api } from "@/libs/axiosInstance"
import { validateDateRange, validateTimeRange } from "@/utils/validation"
import { SelectChangeEvent } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import Swal from "sweetalert2"

const useAddActivity = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const query = useQueryClient()
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    activityTitle: "",
    projectId: "",
  })

  const mutation = useMutation({
    mutationFn: (newActivity: IAddActivity) => Api.post("/activity", newActivity),
    onSuccess: (response) => {
      Swal.fire({
        icon: "success",
        title: "Kegiatan baru berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      })
      query.invalidateQueries()
      setOpen(false)
      console.log("Activity created successfully", response.data)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleProjectChange = (e: SelectChangeEvent<string | any>) => {
    setFormData({
      ...formData,
      projectId: e.target.value as string,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateDateRange(formData.startDate, formData.endDate)) {
      alert("Tanggal Mulai tidak boleh lebih besar dari Tanggal Berakhir")
      return
    }

    if (!validateTimeRange(formData.startTime, formData.endTime)) {
      alert("Waktu Mulai tidak boleh lebih besar dari Waktu Berakhir")
      return
    }
    mutation.mutate(formData)
  }

  return {
    formData,
    handleProjectChange,
    handleSubmit,
    handleChange,
  }
}

export default useAddActivity

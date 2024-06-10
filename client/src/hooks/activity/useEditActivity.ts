"use client"
import { IEditActivity } from "@/interface/IActivityModal"
import { Api } from "@/libs/axiosInstance"
import { SelectChangeEvent } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

interface Props {
  editActivity: IEditActivity | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useEditActivity = ({ setOpen, editActivity }: Props) => {
  const handleClose = () => setOpen(false)

  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<IEditActivity | null>(null)

  useEffect(() => {
    if (editActivity) {
      setFormData(editActivity)
    }
  }, [editActivity])

  const updateActivity = useMutation({
    mutationFn: (newActivity: IEditActivity) =>
      Api.put(`/activity/${editActivity?.id}`, newActivity),
    onSuccess: () => {
      queryClient.invalidateQueries()
      Swal.fire({
        icon: "success",
        title: "Perbarui Kegiatan Berhasil!",
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleChangeProject = (e: SelectChangeEvent<string>) => {
    if (formData) {
      setFormData({
        ...formData,
        projectId: e.target.value as string,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      updateActivity.mutate(formData)
      handleClose()
    }
  }

  return { handleSubmit, handleChange, handleChangeProject, handleClose, formData }
}

export default useEditActivity

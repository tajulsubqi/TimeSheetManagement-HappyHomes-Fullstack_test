"use client"
import { Api } from "@/libs/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Swal from "sweetalert2"

interface IProject {
  projectName: string
}

const useAddProject = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const query = useQueryClient()
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState<IProject>({
    projectName: "",
  })

  const addProject = useMutation({
    mutationFn: (newProject: IProject) => Api.post("/project", newProject),
    onSuccess: () => {
      formData.projectName = ""
      Swal.fire({
        icon: "success",
        title: "Proyek Baru Berhasil Ditambahkan!",
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      })
      query.invalidateQueries()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    addProject.mutate(formData)
    handleClose()
  }

  return {
    handleSubmit,
    handleClose,
    setFormData,
    formData,
  }
}

export default useAddProject

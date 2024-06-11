"use client"
import { Api } from "@/libs/axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface IDeleteActivity {
  deleteId: string | null
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useDeleteActivity = ({ setOpen, deleteId }: IDeleteActivity) => {
  const handleClose = () => setOpen(false)
  const query = useQueryClient()
  const deleteActivity = useMutation({
    mutationFn: (deleteId: string | null) => Api.delete(`/activity/${deleteId}`),
    onSuccess: (response) => {
      query.invalidateQueries()
      Swal.fire({
        icon: "success",
        title: "Kegiatan berhasil dihapus!",
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  const handleDeleteActivity = () => {
    deleteActivity.mutate(deleteId)
    handleClose()
  }

  return { handleDeleteActivity, handleClose }
}

export default useDeleteActivity

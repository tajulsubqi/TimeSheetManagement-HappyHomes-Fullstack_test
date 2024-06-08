"use client"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import DateInput from "../ui/DateInput"
import Input from "../ui/Input"
import SelectInput from "../ui/SelectInput"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Api } from "@/libs/axiosInstance"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  editActivity: IActivity | null
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  borderRadius: 2,
  bgcolor: "background.paper",
  p: 3,
}

interface IActivity {
  id: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  activityTitle: string
}

const EditActivityModal = ({ open, setOpen, editActivity }: Props) => {
  const handleClose = () => setOpen(false)

  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<IActivity | null>(null)

  useEffect(() => {
    if (editActivity) {
      setFormData(editActivity)
    }
  }, [editActivity])

  const updateActivity = useMutation({
    mutationFn: (newActivity: IActivity) => {
      const token = localStorage.getItem("token")
      return Api.put(`/activity/${editActivity?.id}`, newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries()
      Swal.fire({
        icon: "success",
        title: "Edit Activity Success!",
        showConfirmButton: false,
        timer: 1500,
      })
      console.log("Edit", response.data)
    },
    onError: (error: any) => {
      console.log("Error", error)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      updateActivity.mutate(formData)
      handleClose()
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-6">
              Edit Kegiatan
            </h3>
            <div className="flex gap-x-4 my-6">
              <DateInput
                type="date"
                name="startDate"
                onChange={handleChange}
                value={formData?.startDate || ""}
                label="Tanggal Mulai"
              />
              <DateInput
                type="date"
                name="endDate"
                onChange={handleChange}
                value={formData?.endDate || ""}
                label="Tanggal Berakhir"
              />
              <DateInput
                onChange={handleChange}
                value={formData?.startTime || ""}
                type="time"
                label="Jam Mulai"
                name="startTime"
              />
              <DateInput
                onChange={handleChange}
                value={formData?.endTime || ""}
                name="endTime"
                type="time"
                label="Jam Berakhir"
              />
            </div>

            <div className="flex flex-col gap-y-5 ">
              <Input
                onChange={handleChange}
                value={formData?.activityTitle || ""}
                name="activityTitle"
                label="Judul Kegiatan"
              />

              <SelectInput />
            </div>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-7">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Batal
              </button>{" "}
              <button
                type="submit"
                className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditActivityModal

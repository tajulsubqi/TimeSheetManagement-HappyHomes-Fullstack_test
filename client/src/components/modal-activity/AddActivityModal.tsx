"use client"
import { Api } from "@/libs/axiosInstance"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import DateInput from "../ui/DateInput"
import Input from "../ui/Input"
import SelectInput from "../ui/SelectInput"
import { validateDateRange, validateTimeRange } from "@/utils/validation"
import Swal from "sweetalert2"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IActivity {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  activityTitle: string
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

const AddActivityModal = ({ open, setOpen }: Props) => {
  const query = useQueryClient()
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    activityTitle: "",
  })

  const mutation = useMutation({
    mutationFn: (newActivity: IActivity) => {
      const token = localStorage.getItem("token")
      return Api.post("/activity", newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: (response) => {
      console.log("Activity created successfully", response.data)
      Swal.fire({
        icon: "success",
        title: "Create Activity Success!",
        showConfirmButton: false,
        timer: 1500,
      })
      query.invalidateQueries()
      setOpen(false)
    },
    onError: (error: any) => {
      console.error("Error creating activity", error)
      alert("Failed to create activity. " + (error.response?.data?.message || ""))
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
              Tambah Kegiatan Baru
            </h3>
            <div className="flex gap-x-4 my-6">
              <DateInput
                onChange={handleChange}
                value={formData.startDate}
                name="startDate"
                label="Tanggal Mulai"
              />
              <DateInput
                onChange={handleChange}
                value={formData.endDate}
                name="endDate"
                label="Tanggal Berakhir"
              />
              <DateInput
                onChange={handleChange}
                value={formData.startTime}
                name="startTime"
                type="time"
                label="Jam Mulai"
              />
              <DateInput
                onChange={handleChange}
                value={formData.endTime}
                name="endTime"
                type="time"
                label="Jam Berakhir"
              />
            </div>

            <div className="flex flex-col gap-y-5 ">
              <Input
                onChange={handleChange}
                value={formData.activityTitle}
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
              </button>

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

export default AddActivityModal

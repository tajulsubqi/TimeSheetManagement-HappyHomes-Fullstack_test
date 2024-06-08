"use client"
import { Api } from "@/libs/axiosInstance"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import Input from "../ui/Input"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  borderRadius: 2,
  bgcolor: "background.paper",
  p: 3,
}

interface IProject {
  projectName: string
}

const AddProjectModal = ({ open, setOpen }: Props) => {
  const query = useQueryClient()
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState<IProject>({
    projectName: "",
  })

  const addProject = useMutation({
    mutationFn: (newProject: IProject) => {
      const token = localStorage.getItem("token")
      return Api.post("/project", newProject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },

    onSuccess: (response) => {
      query.invalidateQueries()
      console.log("project", response.data)
    },
    onError: (error) => {
      console.log("error", error)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    addProject.mutate(formData)
    handleClose()
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
          <div>
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-3">
              Tambah Proyek Baru
            </h3>

            <div className="flex flex-col pt-7 pb-3">
              <Input
                name="projectName"
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                value={formData.projectName}
                label="Nama Proyek"
              />
            </div>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-7">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Simpan
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddProjectModal

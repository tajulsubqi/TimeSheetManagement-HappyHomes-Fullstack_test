"use client"
import { Api } from "@/libs/axiosInstance"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  deleteId: string | null
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

const DeleteActivityModal = ({ open, setOpen, deleteId }: Props) => {
  const handleClose = () => setOpen(false)

  const query = useQueryClient()
  const deleteActivity = useMutation({
    mutationFn: (deleteId: string | null) => {
      const token = localStorage.getItem("token")
      return Api.delete(`/activity/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },

    onSuccess: (response) => {
      query.invalidateQueries()
      Swal.fire({
        icon: "success",
        title: "Delete Activity Success!",
        showConfirmButton: false,
        timer: 1500,
      })
      console.log("Delete", response.data)
    },
  })

  const handleDeleteActivity = () => {
    deleteActivity.mutate(deleteId)
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
            <h3 className="text-xl font-semibold">
              Apakah anda yakin ingin menghapus kegiatan ini?
            </h3>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-4">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Batal
              </button>{" "}
              <button
                onClick={handleDeleteActivity}
                className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteActivityModal

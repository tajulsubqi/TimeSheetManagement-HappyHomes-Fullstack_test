"use client"
import { PropsModalActivity } from "@/interface/IActivityModal"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Input from "../ui/Input"
import useAddProject from "@/hooks/project/useAddProject"

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

const AddProjectModal = ({ open, setOpen }: PropsModalActivity) => {
  const { formData, setFormData, handleSubmit, handleClose } = useAddProject(setOpen)

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
